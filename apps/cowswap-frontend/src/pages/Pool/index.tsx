import { Trans } from "@lingui/macro";
import { AutoColumn } from "legacy/components/Column";
import { ThemedText } from "legacy/theme";
import { ButtonRow, ErrorContainer, InboxIcon, MainContentWrapper, PageWrapper, ResponsiveButtonPrimary, TitleRow } from "./styled";
import { Link } from 'react-router-dom'
import { ButtonPrimary, ButtonText } from "../../../../../libs/ui/src/pure/Button";
import { useToggleWalletModal } from "legacy/state/application/hooks";
import { useUserHideClosedPositions } from "legacy/state/user/hooks";
import { useMemo } from "react";
import { useV3Positions } from "legacy/hooks/pools/useV3positions";
import { PositionDetails } from "legacy/types/position";
import { useFilterPossiblyMaliciousPositions } from "legacy/hooks/pools/useFilterPossiblyMaliciousPositions";
import PositionList from "modules/pools/containers/PositionList";
import { SupportedChainId } from "common/constants/chains";
import { NetworkIcon } from "modules/wallet/pure/Web3StatusInner/styled";
import { useWeb3React } from "@web3-react/core";

function PositionsLoadingPlaceholder() {
    return (
        <>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </>
    )
}

function WrongNetworkCard() {
    return (
        <>
            <PageWrapper>
                <AutoColumn gap="lg" justify="center">
                    <AutoColumn gap="lg" style={{ width: '100%' }}>
                        <TitleRow padding="0">
                            <ThemedText.LargeHeader>
                                <Trans>Pools</Trans>
                            </ThemedText.LargeHeader>
                        </TitleRow>
                        <MainContentWrapper>
                            <ErrorContainer>
                                <ThemedText.DeprecatedBody color={'#fff'} textAlign="center">
                                    <NetworkIcon strokeWidth={1.2} />
                                    <div data-testid="pools-unsupported-err">
                                        <Trans>Your connected network is unsupported.</Trans>
                                    </div>
                                </ThemedText.DeprecatedBody>
                            </ErrorContainer>
                        </MainContentWrapper>
                    </AutoColumn>
                </AutoColumn>
            </PageWrapper>
        </>
    )
}

export default function Pool() {

    const { account, chainId } = useWeb3React()
    const toggleWalletModal = useToggleWalletModal()

    const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions()

    const { positions, loading: positionsLoading } = useV3Positions(account)

    const [openPositions, closedPositions] = positions?.reduce<[PositionDetails[], PositionDetails[]]>(
        (acc, p) => {
            acc[p.liquidity?.isZero() ? 1 : 0].push(p)
            return acc
        },
        [[], []]
    ) ?? [[], []]

    const userSelectedPositionSet = useMemo(
        () => [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)],
        [closedPositions, openPositions, userHideClosedPositions]
    )

    const filteredPositions = useFilterPossiblyMaliciousPositions(userSelectedPositionSet)

    const showConnectAWallet = Boolean(!account)

    if (!(SupportedChainId.LIGHTLINK_PEGASUS_TESTNET === chainId)) {
        return <WrongNetworkCard />
    }

    return (
        <PageWrapper>
            <AutoColumn gap="lg" justify="center">
                <AutoColumn gap="lg" style={{ width: '100%' }}>
                    <TitleRow padding="0">
                        <ThemedText.LargeHeader>
                            <Trans>Pools</Trans>
                        </ThemedText.LargeHeader>
                        <ButtonRow>
                            <ResponsiveButtonPrimary
                                data-cy="join-pool-button"
                                id="join-pool-button"
                                as={Link}
                                to="/add/ETH"
                                style={{
                                    background: `linear-gradient(146deg, #a1eeff 0%, #029af0 100%)`,
                                    color: '#000',
                                }}
                            >
                                + <Trans>New Position</Trans>
                            </ResponsiveButtonPrimary>
                        </ButtonRow>
                    </TitleRow>
                    <MainContentWrapper>
                        {positionsLoading ? (
                            <PositionsLoadingPlaceholder />
                        ) : filteredPositions && closedPositions && filteredPositions.length > 0 ? (
                            <PositionList
                                positions={filteredPositions}
                                setUserHideClosedPositions={setUserHideClosedPositions}
                                userHideClosedPositions={userHideClosedPositions}
                            />
                        ) : (
                            <ErrorContainer>
                                <ThemedText.DeprecatedBody color={'black'} textAlign="center">
                                    <InboxIcon strokeWidth={1} style={{ marginTop: '2em' }} />
                                    <div>
                                        <Trans>Your active liquidity positions will appear here.</Trans>
                                    </div>
                                </ThemedText.DeprecatedBody>
                                {!showConnectAWallet && closedPositions.length > 0 && (
                                    <ButtonText
                                        style={{
                                            marginTop: '.5rem',
                                            background: `linear-gradient(146deg, #a1eeff 0%, #029af0 100%)`,
                                            color: '#000',
                                            padding: '10px',
                                            marginBottom: '10px',
                                        }}
                                        onClick={() => setUserHideClosedPositions(!userHideClosedPositions)}
                                    >
                                        <Trans>Show closed positions</Trans>
                                    </ButtonText>
                                )}
                                {showConnectAWallet && (

                                    <ButtonPrimary
                                        style={{
                                            marginTop: '2em',
                                            marginBottom: '2em',
                                            padding: '8px 16px',
                                            background: `linear-gradient(146deg, #a1eeff 0%, #029af0 100%)`,
                                            color: '#000',
                                            borderRadius: '10px',
                                        }}
                                        onClick={toggleWalletModal}
                                    >
                                        <Trans>Connect a wallet</Trans>
                                    </ButtonPrimary>
                                )}
                            </ErrorContainer>
                        )}
                    </MainContentWrapper>
                </AutoColumn>
            </AutoColumn>
        </PageWrapper>
    )
}