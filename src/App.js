import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js";
import ERC1155Approvals from "./components/ERC1155Approvals.js";
import ApprovalDashboard from "./components/ApprovalDashboard.js";
import BatchRevoke from "./components/BatchRevoke.js";
import NetworkSelector from "./components/NetworkSelector.js";
import ExistingApprovals from "./components/ExistingApprovals.js";
import { CONTRACT_ADDRESSES } from "./constants/abis";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const wallet = useSelector((state) => state.web3.account);
    const network = useSelector((state) => state.web3.network);

    useEffect(() => {
        console.log("Wallet:", wallet);
        console.log("Network:", network);
    }, [wallet, network]);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary fw-bold">Mini Revoke Cash</h1>
            <WalletConnect />
            <NetworkSelector />
            {wallet && network && (
                <>
                    <ExistingApprovals />
                    <ApprovalDashboard />
                    <TokenAllowanceManager />
                    <NFTApprovals contractAddress={CONTRACT_ADDRESSES.TestNFT} />
                    <ERC1155Approvals contractAddress={CONTRACT_ADDRESSES.ERC1155} owner={wallet} />
                </>
            )}
            {wallet && (
                <button className="btn btn-danger btn-lg fw-bold">🚨 Revoke All Approvals</button>
            )}
        </div>
    );
};

export default App;