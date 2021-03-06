const expect = require('chai').expect

const ipv4Address = require('../../../lib/validator/custom-formats/ipv4-address')

describe('validator/custom-formats/ipv4-address', () => {
  it('returns false when value is undefined', () => {
    expect(ipv4Address(undefined)).to.be.equal(false)
  })

  it('returns false when value is null', () => {
    expect(ipv4Address(null)).to.be.equal(false)
  })

  it('returns false when value is an object', () => {
    expect(ipv4Address({})).to.be.equal(false)
  })

  it('returns false when value is an array', () => {
    expect(ipv4Address([])).to.be.equal(false)
  })

  it('returns false when value is an integer', () => {
    expect(ipv4Address(1)).to.be.equal(false)
  })

  it('returns false when value is a float', () => {
    expect(ipv4Address(0.5)).to.be.equal(false)
  })

  it('returns false when value is NaN', () => {
    expect(ipv4Address(NaN)).to.be.equal(false)
  })

  it('returns false when value is Infinity', () => {
    expect(ipv4Address(Infinity)).to.be.equal(false)
  })

  it('returns false when value does not consist of four octets', () => {
    expect(ipv4Address('100.101.102')).to.be.equal(false)
  })

  it('returns false when octets contain non-numeric characters', () => {
    expect(ipv4Address('100a.101.102.103')).to.be.equal(false)
    expect(ipv4Address('100.101a.102.103')).to.be.equal(false)
    expect(ipv4Address('100.101.102a.103')).to.be.equal(false)
    expect(ipv4Address('100.101.102.103a')).to.be.equal(false)
  })

  it('returns false when octets contain negative numbers', () => {
    expect(ipv4Address('-100.101.102.103')).to.be.equal(false)
    expect(ipv4Address('100.-101.102.103')).to.be.equal(false)
    expect(ipv4Address('100.101.-102.103')).to.be.equal(false)
    expect(ipv4Address('100.101.102.-103')).to.be.equal(false)
  })

  it('returns false when octets contain numbers > 255', () => {
    expect(ipv4Address('256.101.102.103')).to.be.equal(false)
    expect(ipv4Address('100.256.102.103')).to.be.equal(false)
    expect(ipv4Address('100.101.256.103')).to.be.equal(false)
    expect(ipv4Address('100.101.102.256')).to.be.equal(false)
  })

  it('returns true when valid IPv4 address', () => {
    expect(ipv4Address('0.0.0.0')).to.be.equal(true)
    expect(ipv4Address('127.0.0.1')).to.be.equal(true)
    expect(ipv4Address('255.255.255.255')).to.be.equal(true)
  })
})
