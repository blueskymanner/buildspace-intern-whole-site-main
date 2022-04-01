import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text } from "crox-new-uikit";
import './gadget.css'

const MintNFT = () => {
    const navigate = useNavigate();
    return (
        <Flex flexDirection='column' alignItems='center' className="container-n cursor" onClick={() => navigate('/mint')}>
            <Text fontSize="24px" color="#e2e2e2" mb={10} bold>Mint your NFT</Text>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src="https://assets2.lottiefiles.com/packages/lf20_mj9xns8a.json"
                class='animation'
                style={{ width: '200px' }}
            />
        </Flex>
    )
}

export default MintNFT