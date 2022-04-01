import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Flex, Text } from "crox-new-uikit";
import { Icon } from '@iconify/react';
import { HiOutlineExternalLink } from 'react-icons/hi'
import useMediaQuery from "use-mediaquery";
import { injected } from "../connector";
import { Button } from "../CommonComponents";
import '../../assets/style/scss/style-common.scss'
import '../../assets/style/scss/style-basic.scss'
import './header.css'

let isConfirm = false

function Header(props) {
    const { setToggle } = props;
    const { account, activate, deactivate, error, active, chainId } = useWeb3React();

    const handleLogin = () => {
        isConfirm = true
        localStorage.setItem("accountStatus", "1");
        return activate(injected)
    }

    const handleLogout = () => {
        isConfirm = false
        localStorage.removeItem("accountStatus")
        deactivate()
    }

    function copyToClipBoard() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    useEffect(() => {
        if (!chainId && isConfirm) {
            const { ethereum } = window;
            (async () => {
                try {
                    await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x4" }],
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: "0x4",
                                        chainName: "Rinkeby Test Network",
                                        nativeCurrency: {
                                            name: "ETH",
                                            symbol: "ETH",
                                            decimals: 18,
                                        },
                                        rpcUrls: ["https://rinkeby.infura.io/v3/"],
                                        blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
                                    },
                                ],
                            });
                        } catch (addError) {
                            console.error(addError);
                        }
                    }
                }
                activate(injected);
            })();
            isConfirm = false;
        }
    }, [account, error]);

    useEffect(() => {
        if (!active && localStorage.getItem("accountStatus")) {
            activate(injected);
        }
    }, [])

    const isMobile = useMediaQuery("(max-width: 600px)")

    return (
        <Flex justifyContent={isMobile ? 'space-between' : 'flex-end'} className="header">
            {isMobile && <Button className='animateButton ml-10' onClick={() => setToggle(true)}><Icon icon="line-md:menu-unfold-left" fontSize={21} /></Button>}
            {!account ? (
                <Button className="animateButton" onClick={handleLogin}>Connect Wallet</Button>
            ) : (
                <Flex>
                    <Button className="animateButton mr-10" onClick={() => {
                        navigator.clipboard.writeText(account)
                        copyToClipBoard()
                    }}>{account.slice(0, 5)}...{account.slice(-5)}</Button>
                    <Button className="animateButton" onClick={handleLogout}><HiOutlineExternalLink fontSize={21} /></Button>
                    <Text id="snackbar">Copied</Text>
                </Flex>
            )}
        </Flex>
    )
}

export default Header