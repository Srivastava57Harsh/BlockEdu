import {
  Claim as ClaimEvent,
  Divest as DivestEvent,
  Invest as InvestEvent,
  RiskSplit as RiskSplitEvent
} from "../generated/Protocol/Protocol"
import { Claim, Divest, Invest, RiskSplit } from "../generated/schema"

export function handleClaim(event: ClaimEvent): void {
  let entity = new Claim(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.claimant = event.params.claimant
  entity.amount_A = event.params.amount_A
  entity.amount_B = event.params.amount_B
  entity.amount_c = event.params.amount_c
  entity.amount_cx = event.params.amount_cx
  entity.amount_cy = event.params.amount_cy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDivest(event: DivestEvent): void {
  let entity = new Divest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount_c = event.params.amount_c
  entity.amount_cx = event.params.amount_cx
  entity.amount_cy = event.params.amount_cy
  entity.amount_c_incentive = event.params.amount_c_incentive

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInvest(event: InvestEvent): void {
  let entity = new Invest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount_c = event.params.amount_c
  entity.amount_cx = event.params.amount_cx
  entity.amount_cy = event.params.amount_cy
  entity.amount_c_incentive = event.params.amount_c_incentive

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRiskSplit(event: RiskSplitEvent): void {
  let entity = new RiskSplit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.splitter = event.params.splitter
  entity.amount_c = event.params.amount_c

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
