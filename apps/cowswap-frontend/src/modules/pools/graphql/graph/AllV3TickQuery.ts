import gql from 'graphql-tag'


gql`
  query AllV3Ticks($poolAddress: String, $skip: Int!) {
    ticks(first: 1000, skip: $skip, where: { poolAddress: $poolAddress }, orderBy: tickIdx) {
      tick: tickIdx
      liquidityNet
      price0
      price1
    }
  }
`

export type Ticks = any['ticks']
export type TickData = Ticks[number]
