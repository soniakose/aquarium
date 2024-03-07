import 'src/utils/utils.css'
import './workspace-selector.css'
import {
  Avatar,
  type IAvatarProps,
  type INavigationAccount,
  type INavigationOrg,
  type INavigationWorkspace,
  type IWorkspaceSelectorDisplayItem,
  Popover,
  Image
} from 'src/components'
import React, { type ChangeEvent, useRef, useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { createSvgDataBlobFromText, debounce } from 'src/utils/utils'
import { getInitials } from 'src/utils/utils'

// Need to make our Input component comply with forwardRef to be able to import it from src/components
// Couldn't make it work as of right now
import { type InputRef } from 'antd'
import { WorkspaceSelectorContent } from 'src/components/navigation/GlobalNavigation/WorkspaceSelector/WorkspaceSelectorContent'

export interface IWorkspaceSelectorProps {
  orgs: INavigationOrg[]
  avatarOptions?: IAvatarProps
  signoutOptions?: {
    label?: string
    onSignout: () => void
  }
}

function moveToTheTop<T>(array: T[], index: number): T[] {
  return [array[index], ...array.slice(0, index), ...array.slice(index + 1)]
}

function sortOrgsByActiveWorkspace(orgs: INavigationOrg[]): INavigationOrg[] {
  const activeOrgIndex = orgs.findIndex(org =>
    org.accounts.find(account => account.workspaces.find(workspace => workspace.isActive)),
  )

  if (activeOrgIndex >= 0) {
    const activeOrg = orgs[activeOrgIndex]
    const activeAccountIndex = activeOrg.accounts.findIndex(account =>
      account.workspaces.find(workspace => workspace.isActive),
    )

    if (activeAccountIndex >= 0) {
      const activeAccount = activeOrg.accounts[activeAccountIndex]
      activeOrg.accounts = moveToTheTop(activeOrg.accounts, activeAccountIndex)

      const activeWorkspaceIndex = activeAccount.workspaces.findIndex(workspace => workspace.isActive)
      activeAccount.workspaces = moveToTheTop(activeAccount.workspaces, activeWorkspaceIndex)

      return moveToTheTop(orgs, activeOrgIndex)
    }
  }

  return orgs
}

export function WorkspaceSelector(props: IWorkspaceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const inputRef = useRef<InputRef>(null)

  const sortedOrgs = useMemo(() => {
    return sortOrgsByActiveWorkspace(props.orgs)
  }, [props.orgs])

  const [currentFilteredOrgs, setCurrentFilteredOrgs] = useState<INavigationOrg[]>(sortedOrgs)

  useEffect(() => {
    // since we are setting state from props, when the props change be sure to update the state
    setCurrentFilteredOrgs(sortedOrgs)
  }, [sortedOrgs])

  const setCurrentFilteredOrgsDebounced = useCallback(debounce(setCurrentFilteredOrgs, 200), [])

  const hasNoResults = !!searchTerm && !currentFilteredOrgs.length

  const menuItems: IWorkspaceSelectorDisplayItem[] = useMemo(
    () => generateDisplayItems(/* currentFilteredOrgs */),
    [currentFilteredOrgs],
  )

  // todo: this probably doesnt need to be calculated on every render
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const activeWorkspace: INavigationWorkspace = props.orgs
    .flatMap<INavigationWorkspace>(org => {
      let flattenedSelectors: INavigationWorkspace[] = []

      const { accounts } = org
      if (accounts) {
        const workspaces = accounts.flatMap(({ workspaces }) => workspaces)
        flattenedSelectors = flattenedSelectors.concat(workspaces)
      }

      return flattenedSelectors
    })
    .find(workspaceCandidate => workspaceCandidate.isActive)!

  // This seems to be the only way of consistenly focusing the input on the first open
  // We should find a better way to do this and not rely on setTimout
  const focusOnInput = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus({
          cursor: 'all',
        })
      }, 0)
    }
  }

  return (
    <Popover
      arrow={false}
      placement="right"
      // Use case for variables.ts once style-dictionary is exporting both css and ts files
      overlayInnerStyle={{ padding: 4 }}
      overlayClassName="workspaceSelector__popover"
      onOpenChange={focusOnInput}
      afterOpenChange={focusOnInput}
      content={
        <WorkspaceSelectorContent
          onSearch={onSearch}
          searchTerm={searchTerm}
          inputRef={inputRef}
          hasNoResults={hasNoResults}
          signoutOptions={props.signoutOptions}
          menuItems={menuItems}
        />
      }
    >
      <div className="globalNavigation__item workspaceSelector__menuItem">
       {renderAvatar(activeWorkspace, props.avatarOptions!)}
      </div>
    </Popover>
  )

  function renderAvatar(activeWorkspace: INavigationWorkspace, avatarOptions: IAvatarProps): JSX.Element {
    const workspaceInitials = getInitials(activeWorkspace?.label)

    if (avatarOptions.src || avatarOptions.srcSet) {
      const initialsImage = createSvgDataBlobFromText(workspaceInitials);
      const image = <Image src={avatarOptions.src ?? avatarOptions.srcSet} fallback={initialsImage} preview={false} />
      const adjustedAvatarOptions = {
        ...avatarOptions,
        src: image,
        srcSet: undefined,
      }

      return <Avatar
        {...adjustedAvatarOptions}
        className="workspaceSelector__avatar workspaceSelector__avatar--with-image"
      />
    }
      
    return <Avatar
      {...avatarOptions}
      className="workspaceSelector__avatar"
    >{workspaceInitials}</Avatar>
  }

  function generateDisplayItems(): IWorkspaceSelectorDisplayItem[] {
    const items = currentFilteredOrgs.reduce<IWorkspaceSelectorDisplayItem[]>((total, org) => {
      total.push({
        type: 'org',
        className: 'workspaceSelector__orgName' + (org.label ? '' : ' u-display-none'),
        label: org.label,
        id: org.id,
        key: `${org.id}_${org.label}`,
        accounts: org.accounts,
        workspaces: org.accounts.flatMap(account => account.workspaces),
      })

      org.accounts.forEach(account => {
        total.push({
          type: 'account',
          className: 'workspaceSelector__accountName' + (account.label ? '' : ' u-display-none'),
          label: account.label,
          id: account.id,
          key: `${account.id}_${account.label}`,
          workspaces: account.workspaces,
        })

        account.workspaces.forEach(workspace => {
          total.push({
            type: 'workspace',
            className:
              'workspaceSelector__workspaceName' +
              (workspace.isActive ? ' workspaceSelector__workspaceName--active' : ''),
            label: workspace.label,
            id: workspace.id,
            key: `${workspace.id}_${workspace.label}`,
            onClick: workspace.onClick,
            isActive: workspace.isActive,
          })
        })
      })

      return total
    }, [])

    // prevent attributes to end up in the HTML
    return items.map(item => ({
      type: item.type,
      className: item.className,
      label: item.label,
      id: item.id,
      key: item.key,
      onClick: item.onClick,
      isActive: item.isActive,
    }))
  }

  function onSearch(e: ChangeEvent<HTMLInputElement>): void {
    const newSearchTerm = e.target.value.toLowerCase()
    setSearchTerm(newSearchTerm)

    if (newSearchTerm) {
      const filteredOrgs = getFilteredOrgs()
      setCurrentFilteredOrgsDebounced(filteredOrgs)
    } else {
      // reset list immediately so it feels faster
      setCurrentFilteredOrgs(sortedOrgs)
    }

    function getFilteredOrgs(): INavigationOrg[] {
      return sortedOrgs.reduce<INavigationOrg[]>((total, org) => {
        if (isHit(org)) {
          total.push(org)
        } else {
          const workingOrg: INavigationOrg = { ...org }
          workingOrg.accounts = []
          org.accounts.forEach(account => {
            const workingAccount = { ...account }
            workingAccount.workspaces = []

            if (isHit(account)) {
              workingOrg.accounts.push(account)
            } else {
              account.workspaces.forEach(workspace => {
                if (isHit(workspace)) {
                  workingAccount.workspaces.push(workspace)
                }
              })
              if (workingAccount.workspaces.length) {
                workingOrg.accounts.push(workingAccount)
              }
            }
          })

          if (workingOrg.accounts.length) total.push(workingOrg)
        }

        return total
      }, [])

      function isHit(item: INavigationOrg | INavigationAccount | INavigationWorkspace): boolean {
        return (
          (!!item.label && item.label.toString().toLowerCase().includes(newSearchTerm)) ||
          (!!item.id && item.id.toString().toLowerCase().includes(newSearchTerm))
        )
      }
    }
  }
}
