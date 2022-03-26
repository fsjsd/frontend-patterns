import React, { Fragment } from 'react'
import appRoutes from '../routes'
import {
  DrawerNavigationStyled,
  DrawerWrapper,
  NavLinks,
  NavGroup,
  LinkStyled,
} from './LeftNavigationUI'

const groups = Array.from(
  new Set(appRoutes.filter(route => !!route.group).map(route => route.group)),
)

const LeftNavigation = () => {
  return (
    <DrawerNavigationStyled>
      <DrawerWrapper isOpen={false}>
        <NavLinks>
          {groups.map(group => (
            <Fragment key={group}>
              <NavGroup>{group}</NavGroup>
              {appRoutes
                .filter(r => r.title && r.icon && r.group === group)
                .map(routeDefinition => (
                  <li key={routeDefinition.path}>
                    <LinkStyled role="link" to={routeDefinition.path}>
                      {routeDefinition.icon} {routeDefinition.title}
                    </LinkStyled>
                  </li>
                ))}
            </Fragment>
          ))}
        </NavLinks>
      </DrawerWrapper>
    </DrawerNavigationStyled>
  )
}

export default LeftNavigation
