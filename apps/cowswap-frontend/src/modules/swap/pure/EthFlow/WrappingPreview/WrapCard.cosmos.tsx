import { WRAPPED_NATIVE_CURRENCY as WETH } from '@cowprotocol/common-const'
import { SupportedChainId } from 'test-cow-v2'
import { CurrencyAmount } from '@uniswap/sdk-core'

import { WrapCard } from 'modules/swap/pure/EthFlow/WrappingPreview/WrapCard'

const WrappedEther = WETH[SupportedChainId.GOERLI]
const wrapAmount = CurrencyAmount.fromRawAmount(WrappedEther, 5.21456 * 10 ** 18)
const balance = CurrencyAmount.fromRawAmount(WrappedEther, 15.12123 * 10 ** 18)

export default <WrapCard currency={WrappedEther} amountToWrap={wrapAmount} balance={balance} />
