import './workspace-selector.css'
import { Avatar } from 'src/components'
import { Input } from 'src/components'
import { Menu } from 'src/components'
import { type IMenuProps } from 'src/components'
import { type INavigationOrg } from 'src/components/navigation/GlobalNavigation/WorkspaceSelectorItems'
import { type WorkspaceSelectorMapping } from 'src/components/navigation/GlobalNavigation/WorkspaceSelectorItems'
import { type INavigationAccount } from 'src/components/navigation/GlobalNavigation/WorkspaceSelectorItems'
import { type INavigationWorkspace } from 'src/components/navigation/GlobalNavigation/WorkspaceSelectorItems'
import { useState } from 'react'
import { useMemo } from 'react'
import { type MenuItemType } from 'src/components/navigation/Menu/Menu'

export interface IWorkspaceSelectorProps {
  orgs: INavigationOrg[]
}

export function WorkspaceSelector(props: IWorkspaceSelectorProps) {
  const allItemsFlat = useMemo(generateAllItems, [props.orgs])

  const [children, setChildren] = useState<WorkspaceSelectorMapping[]>(allItemsFlat)

  const searchEl: MenuItemType = {
    key: 'search',
    className: 'workspaceSelector__search',
    label: (
      <Input
        placeholder="Search"
        className="workspaceSelector__searchInput"
        onChange={onSearch}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      />
    ),
  }

  const items: IMenuProps['items'] = [
    {
      key: 'WorkspaceSelector',
      icon: <Avatar>WS</Avatar>,
      children: [searchEl, ...children],
    },
  ]

  return (
    <Menu
      // openKeys={['WorkspaceSelector']} // testing only
      className="globalNavigation__menu globalNavigation__item"
      items={items}
      subMenuCloseDelay={9999999} // never close the menu on mouse leave
      expandIcon={null}
    />
  )

  function generateAllItems(): WorkspaceSelectorMapping[] {
    return props.orgs.reduce<WorkspaceSelectorMapping[]>((total, org) => {
      total.push({
        type: 'org',
        className: 'workspaceSelector__orgName',
        label: org.label,
        id: org.id,
        key: org.id,
        accounts: org.accounts,
        workspaces: org.accounts.flatMap(account => account.workspaces),
      })

      org.accounts.forEach(account => {
        total.push({
          type: 'account',
          className: 'workspaceSelector__accountName',
          label: account.label,
          id: account.id,
          key: account.id,
          workspaces: account.workspaces,
        })

        account.workspaces.forEach(workspace => {
          total.push({
            type: 'workspace',
            className: 'workspaceSelector__workspaceName',
            label: workspace.label,
            id: workspace.id,
            key: workspace.id,
            onClick: workspace.onClick,
          })
        })
      })

      return total
    }, [])
  }

  function onSearch(e: React.ChangeEvent<HTMLInputElement>): void {
    const searchTerm = e.target.value.toLowerCase()

    const filteredChildren = allItemsFlat?.filter(item => {
      /* eslint-disable-next-line */
      return isHit(item) || item.accounts?.some(isHit) || item.workspaces?.some(isHit)

      function isHit(item: WorkspaceSelectorMapping | INavigationAccount | INavigationWorkspace): boolean {
        return (
          item.label.toString().toLowerCase().includes(searchTerm) ||
          item.id.toString().toLowerCase().includes(searchTerm)
        )
      }
    })

    setChildren(filteredChildren)
  }
}