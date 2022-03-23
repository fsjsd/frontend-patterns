import React from 'react'
import appRoutes from '../routes';
import { DrawerNavigationStyled, DrawerWrapper, NavLinks, NavGroup, LinkStyled } from './LeftNavigationUI';

const groups = Array.from(new Set(appRoutes.filter(route => !!route.group).map(route => route.group!)));

const LeftNavigation = () => {
  return (
    <DrawerNavigationStyled>
      <DrawerWrapper isOpen={false}>
        <NavLinks>
          {groups.map(group => <>
            <NavGroup>{group}</NavGroup>
            {appRoutes.filter(r => r.group === group).map(routeDefinition =>
              <li>
                <LinkStyled to={routeDefinition.path}>{routeDefinition.icon} {routeDefinition.title}</LinkStyled>
              </li>
            )}
          </>)}
        </NavLinks>
      </DrawerWrapper>
    </DrawerNavigationStyled>
  )
}

export default LeftNavigation