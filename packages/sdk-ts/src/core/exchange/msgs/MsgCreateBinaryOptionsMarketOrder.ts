import { MsgCreateBinaryOptionsMarketOrder as BaseMsgCreateBinaryOptionsMarketOrder } from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import {
  DerivativeOrder,
  OrderInfo,
  OrderTypeMap,
} from '@injectivelabs/chain-api/injective/exchange/v1beta1/exchange_pb'
import { MsgBase } from '../../MsgBase'
import { amountToCosmosSdkDecAmount } from '../../../utils/numbers'

export declare namespace MsgCreateBinaryOptionsMarketOrder {
  export interface Params {
    marketId: string
    subaccountId: string
    injectiveAddress: string
    orderType: OrderTypeMap[keyof OrderTypeMap]
    triggerPrice?: string
    feeRecipient: string
    price: string
    margin: string
    quantity: string
  }

  export interface DirectSign {
    type: '/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder'
    message: BaseMsgCreateBinaryOptionsMarketOrder
  }

  export interface Data extends BaseMsgCreateBinaryOptionsMarketOrder.AsObject {
    '@type': '/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder'
  }

  export interface Web3 extends BaseMsgCreateBinaryOptionsMarketOrder.AsObject {
    '@type': '/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder'
  }

  export type Proto = BaseMsgCreateBinaryOptionsMarketOrder
}

const createMarketOrder = (
  params: MsgCreateBinaryOptionsMarketOrder.Params,
) => {
  const orderInfo = new OrderInfo()
  orderInfo.setSubaccountId(params.subaccountId)
  orderInfo.setFeeRecipient(params.feeRecipient)
  orderInfo.setPrice(params.price)
  orderInfo.setQuantity(params.quantity)

  const derivativeOrder = new DerivativeOrder()
  derivativeOrder.setMarketId(params.marketId)
  derivativeOrder.setOrderType(params.orderType)
  derivativeOrder.setOrderInfo(orderInfo)
  derivativeOrder.setMargin(params.margin)

  derivativeOrder.setTriggerPrice(params.triggerPrice || '0')

  const message = new BaseMsgCreateBinaryOptionsMarketOrder()
  message.setSender(params.injectiveAddress)
  message.setOrder(derivativeOrder)

  return message
}

export default class MsgCreateBinaryOptionsMarketOrder extends MsgBase<
  MsgCreateBinaryOptionsMarketOrder.Params,
  MsgCreateBinaryOptionsMarketOrder.Data,
  MsgCreateBinaryOptionsMarketOrder.Proto,
  MsgCreateBinaryOptionsMarketOrder.Web3,
  MsgCreateBinaryOptionsMarketOrder.DirectSign
> {
  static fromJSON(
    params: MsgCreateBinaryOptionsMarketOrder.Params,
  ): MsgCreateBinaryOptionsMarketOrder {
    return new MsgCreateBinaryOptionsMarketOrder(params)
  }

  toProto(): MsgCreateBinaryOptionsMarketOrder.Proto {
    const { params: initialParams } = this
    const params = {
      ...initialParams,
      price: amountToCosmosSdkDecAmount(initialParams.price).toFixed(),
      margin: amountToCosmosSdkDecAmount(initialParams.margin).toFixed(),
      triggerPrice: amountToCosmosSdkDecAmount(
        initialParams.triggerPrice || 0,
      ).toFixed(),
      quantity: amountToCosmosSdkDecAmount(initialParams.quantity).toFixed(),
    } as MsgCreateBinaryOptionsMarketOrder.Params

    return createMarketOrder(params)
  }

  toData(): MsgCreateBinaryOptionsMarketOrder.Data {
    const proto = this.toProto()

    return {
      '@type': '/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder',
      ...proto.toObject(),
    }
  }

  toWeb3(): MsgCreateBinaryOptionsMarketOrder.Web3 {
    const { params } = this
    const proto = createMarketOrder(params)

    return {
      '@type': '/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder',
      ...proto.toObject(),
    }
  }

  toDirectSign(): MsgCreateBinaryOptionsMarketOrder.DirectSign {
    const proto = this.toProto()

    return {
      type: '/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder',
      message: proto,
    }
  }
}