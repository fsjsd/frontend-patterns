import React, { Fragment } from 'react'
import appRoutes from '../routes'
import {
  DrawerNavigation,
  DrawerWrapper,
  NavLinks,
  NavGroup,
  LinkStyled,
} from './styles/LeftNavigationStyles'

const groups = Array.from(
  new Set(appRoutes.filter(route => !!route.group).map(route => route.group)),
)

const LeftNavigation = () => {
  return (
    <DrawerNavigation>
      <DrawerWrapper isOpen={false}>
        {groups.map(group => (
          <Fragment key={group}>
            <NavGroup>{group}</NavGroup>
            <NavLinks>
              {appRoutes
                .filter(r => r.title && r.icon && r.group === group)
                .map(routeDefinition => (
                  <li key={routeDefinition.path}>
                    <LinkStyled role="link" to={routeDefinition.path} $wip={routeDefinition.isWip}>
                      {routeDefinition.icon} {routeDefinition.title}
                    </LinkStyled>
                  </li>
                ))}
            </NavLinks>
          </Fragment>
        ))}
      </DrawerWrapper>
    </DrawerNavigation>
  )
}

export default LeftNavigation
