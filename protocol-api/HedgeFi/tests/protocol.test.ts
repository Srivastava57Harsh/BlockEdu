import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Claim } from "../generated/schema"
import { Claim as ClaimEvent } from "../generated/Protocol/Protocol"
import { handleClaim } from "../src/protocol"
import { createClaimEvent } from "./protocol-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let claimant = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount_A = BigInt.fromI32(234)
    let amount_B = BigInt.fromI32(234)
    let amount_c = BigInt.fromI32(234)
    let amount_cx = BigInt.fromI32(234)
    let amount_cy = BigInt.fromI32(234)
    let newClaimEvent = createClaimEvent(
      claimant,
      amount_A,
      amount_B,
      amount_c,
      amount_cx,
      amount_cy
    )
    handleClaim(newClaimEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Claim created and stored", () => {
    assert.entityCount("Claim", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Claim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimant",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Claim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount_A",
      "234"
    )
    assert.fieldEquals(
      "Claim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount_B",
      "234"
    )
    assert.fieldEquals(
      "Claim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount_c",
      "234"
    )
    assert.fieldEquals(
      "Claim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount_cx",
      "234"
    )
    assert.fieldEquals(
      "Claim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount_cy",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
