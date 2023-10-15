import { Trans } from "@lingui/macro";
import { AutoColumn } from "legacy/components/Column";
import { ThemedText } from "legacy/theme";
import { ButtonRow, ErrorContainer, InboxIcon, MainContentWrapper, PageWrapper, ResponsiveButtonPrimary, TitleRow } from "./styled";
import { Link } from 'react-router-dom'
import { ButtonPrimary, ButtonText } from "../../../../../libs/ui/src/pure/Button";
import { useToggleWalletModal } from "legacy/state/application/hooks";
import { useUserHideClosedPositions } from "legacy/state/user/hooks";
import { useWalletInfo } from '@cowprotocol/wallet'
import { useMemo } from "react";
import { useV3Positions } from "legacy/hooks/pools/useV3positions";
import { PositionDetails } from "legacy/types/position";
import { useFilterPossiblyMaliciousPositions } from "legacy/hooks/pools/useFilterPossiblyMaliciousPositions";
import PositionList from "modules/pools/containers/PositionList";

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

export default function Pool() {

    const toggleWalletModal = useToggleWalletModal()
    const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions()
    const { account } = useWalletInfo()

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