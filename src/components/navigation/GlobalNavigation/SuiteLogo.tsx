import React, { type ReactNode } from 'react'
import { Center, Icon } from 'src/components'
import { type IconColor } from 'src/components/general/Icon/Icon'
import { type IGlobalNavigationLogo } from 'src/components/navigation/GlobalNavigation/GlobalNavigationItems'
import { NavigationIcon } from 'src/components/navigation/GlobalNavigation/NavigationIcon'
import { type DuoIcons, type Icons } from 'src/constants/Icons'

// custom-size is the default size to prevent breaking changes.
type IconColorOptions = 'default' | 'background-solid' | 'custom-size'

function isStringIcon(icon: ReactNode | string): icon is keyof Icons {
  return typeof icon === 'string'
}

export function SuiteLogo({ icon, label, type = 'custom-size', onSuiteLogoClick }: IGlobalNavigationLogo) {
  const classMap = {
    default: '',
    'custom-size': 'globalNavigation__icon--suiteLogo',
    'background-solid': 'globalNavigation__icon--suiteBackground',
  }

  const iconColorMap: { [key in IconColorOptions]: IconColor } = {
    default: 'default',
    'background-solid': 'brand',
    'custom-size': 'default',
  }

  const getIcon = () => {
    if (isStringIcon(icon)) {
      return <Icon name={icon as keyof typeof DuoIcons} color={iconColorMap[type]} size="xl" type="duo" />
    }
    return icon
  }

  return (
    <Center vertical className="globalNavigation__suiteLogo" onClick={onSuiteLogoClick}>
      <NavigationIcon icon={getIcon()} label="" hideLabel className={classMap[type]} />
      {label}
    </Center>
  )
}