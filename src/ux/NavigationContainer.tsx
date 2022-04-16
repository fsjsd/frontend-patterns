import React, { Fragment } from 'react'
import appRoutes from '../routes'
import {
  NavigationScrollArea,
  SubMenuWrapper,
  NavLinks,
  NavGroup,
  LinkStyled,
} from './NavigationContainerStyles'

/** Since routes are static, derive unique nav groups in advance */
const groups = Array.from(
  new Set(appRoutes.filter(route => !!route.group).map(route => route.group)),
)

/**
 * Displays navigation menu for site
 * @param param0 props
 * @returns 
 */
export const NavigationMenu = ({ onItemClick }) => {

  const handleLinkClick = () => {
    onItemClick();
  }

  return (
    <NavigationScrollArea role="navigation">
      {/* Filter control for nav */}
      <SubMenuWrapper isOpen={false}>
        {groups.map(group => (
          <Fragment key={group}>
            <NavGroup>{group}</NavGroup>
            <NavLinks>
              {appRoutes
                .filter(r => r.title && r.icon && r.group === group)
                .map(routeDefinition => (
                  <li key={routeDefinition.path}>
                    <LinkStyled
                      role="link"
                      to={routeDefinition.path}
                      $wip={routeDefinition.isWip}
                      aria-hidden={routeDefinition.isWip}
                      tabIndex={routeDefinition.isWip ? -1 : undefined}
                      onClick={handleLinkClick}
                    >
                      {routeDefinition.icon} {routeDefinition.title}
                    </LinkStyled>
                  </li>
                ))}
            </NavLinks>
          </Fragment>
        ))}
      </SubMenuWrapper>
    </NavigationScrollArea>
  )
}
