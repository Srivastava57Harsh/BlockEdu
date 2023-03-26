import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Claim,
  Divest,
  Invest,
  RiskSplit
} from "../generated/Protocol/Protocol"

export function createClaimEvent(
  claimant: Address,
  amount_A: BigInt,
  amount_B: BigInt,
  amount_c: BigInt,
  amount_cx: BigInt,
  amount_cy: BigInt
): Claim {
  let claimEvent = changetype<Claim>(newMockEvent())

  claimEvent.parameters = new Array()

  claimEvent.parameters.push(
    new ethereum.EventParam("claimant", ethereum.Value.fromAddress(claimant))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "amount_A",
      ethereum.Value.fromUnsignedBigInt(amount_A)
    )
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "amount_B",
      ethereum.Value.fromUnsignedBigInt(amount_B)
    )
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "amount_c",
      ethereum.Value.fromUnsignedBigInt(amount_c)
    )
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "amount_cx",
      ethereum.Value.fromUnsignedBigInt(amount_cx)
    )
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "amount_cy",
      ethereum.Value.fromUnsignedBigInt(amount_cy)
    )
  )

  return claimEvent
}

export function createDivestEvent(
  amount_c: BigInt,
  amount_cx: BigInt,
  amount_cy: BigInt,
  amount_c_incentive: BigInt
): Divest {
  let divestEvent = changetype<Divest>(newMockEvent())

  divestEvent.parameters = new Array()

  divestEvent.parameters.push(
    new ethereum.EventParam(
      "amount_c",
      ethereum.Value.fromUnsignedBigInt(amount_c)
    )
  )
  divestEvent.parameters.push(
    new ethereum.EventParam(
      "amount_cx",
      ethereum.Value.fromUnsignedBigInt(amount_cx)
    )
  )
  divestEvent.parameters.push(
    new ethereum.EventParam(
      "amount_cy",
      ethereum.Value.fromUnsignedBigInt(amount_cy)
    )
  )
  divestEvent.parameters.push(
    new ethereum.EventParam(
      "amount_c_incentive",
      ethereum.Value.fromUnsignedBigInt(amount_c_incentive)
    )
  )

  return divestEvent
}

export function createInvestEvent(
  amount_c: BigInt,
  amount_cx: BigInt,
  amount_cy: BigInt,
  amount_c_incentive: BigInt
): Invest {
  let investEvent = changetype<Invest>(newMockEvent())

  investEvent.parameters = new Array()

  investEvent.parameters.push(
    new ethereum.EventParam(
      "amount_c",
      ethereum.Value.fromUnsignedBigInt(amount_c)
    )
  )
  investEvent.parameters.push(
    new ethereum.EventParam(
      "amount_cx",
      ethereum.Value.fromUnsignedBigInt(amount_cx)
    )
  )
  investEvent.parameters.push(
    new ethereum.EventParam(
      "amount_cy",
      ethereum.Value.fromUnsignedBigInt(amount_cy)
    )
  )
  investEvent.parameters.push(
    new ethereum.EventParam(
      "amount_c_incentive",
      ethereum.Value.fromUnsignedBigInt(amount_c_incentive)
    )
  )

  return investEvent
}

export function createRiskSplitEvent(
  splitter: Address,
  amount_c: BigInt
): RiskSplit {
  let riskSplitEvent = changetype<RiskSplit>(newMockEvent())

  riskSplitEvent.parameters = new Array()

  riskSplitEvent.parameters.push(
    new ethereum.EventParam("splitter", ethereum.Value.fromAddress(splitter))
  )
  riskSplitEvent.parameters.push(
    new ethereum.EventParam(
      "amount_c",
      ethereum.Value.fromUnsignedBigInt(amount_c)
    )
  )

  return riskSplitEvent
}
