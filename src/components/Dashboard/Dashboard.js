import React from "react";
import {BsInbox} from 'react-icons/bs'
import {RiUserReceivedLine} from 'react-icons/ri'

import logo from '../../assets/img/programmingdictionary_banner.svg'


import {DashboardLogo, DashboardWraper, DashLink, LinkIcon, LinkText, Logo, LogoText,} from "../";


export default function Dashboard({show, toggleDashOnSmallDevice}) {
    const dashLinks = [
        {to: "/", name: 'Inbox', icon: BsInbox},
        {to: "/receive/", name: 'Receive', icon: RiUserReceivedLine},

    ]


    return (
        <>
            <DashboardWraper show={show}>
                <DashboardLogo exact="true" to="/">
                    <Logo src={logo}/>
                    <LogoText>
                        Test Project
                    </LogoText>
                </DashboardLogo>
                {
                    dashLinks.map((link, i) => {
                        return (

                            <DashLink key={i} onClick={() => toggleDashOnSmallDevice()}
                                      className={(navData) => (navData.isActive ? "active-style" : 'none')}
                                      to={link.to} exact="true">
                                <LinkIcon>
                                    <link.icon/>
                                </LinkIcon>
                                <LinkText>
                                    {link.name}
                                </LinkText>
                            </DashLink>
                        )
                    })
                }

            </DashboardWraper>
        </>
    );
}
