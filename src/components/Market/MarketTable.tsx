import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Divider,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { MarketItem } from './MarketSelect';

export interface MarketTableOrder {
  price: number;
  quantity: number;
}

export interface MarketTableData {
  ask_orders: MarketTableOrder[];
  bid_orders: MarketTableOrder[];
}

export interface MarketTableProps {
  data: MarketTableData;
  market?: MarketItem;
}

const MarketTableCell: React.FC<{ order: MarketTableOrder }> = ({ order }) => {
  const priceInt = new BigNumber(order.price);
  const quantityInt = new BigNumber(order.quantity);

  const price = priceInt.dividedBy(Math.pow(10, 24));
  const quantity = quantityInt.dividedBy(Math.pow(10, 24));
  const total = price.multipliedBy(quantity);

  return (
    <Tr>
      <Td>{price.toFormat(2)}</Td>
      <Td>{quantity.toFormat(2)}</Td>
      <Td isNumeric>{total.toFormat(2)}</Td>
    </Tr>
  );
};

const MarketTable: React.FC<MarketTableProps> = ({ data, market }) => {
  return (
    <TableContainer>
      <Text fontSize="xl" fontWeight="semibold">
        Ask orders
      </Text>

      <Table variant="striped" mb={10}>
        <Thead>
          <Tr>
            <Th>Price ({market?.quote.ticker})</Th>
            <Th>Size ({market?.base.ticker})</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.ask_orders.map((order, index) => (
            <MarketTableCell key={index} order={order} />
          ))}
        </Tbody>
      </Table>

      <Text fontSize="xl" fontWeight="semibold">
        Bid orders
      </Text>

      <Table variant="striped" mb={10}>
        <Thead>
          <Tr>
            <Th>Price ({market?.quote.ticker})</Th>
            <Th>Size ({market?.base.ticker})</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.bid_orders.map((order, index) => (
            <MarketTableCell key={index} order={order} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MarketTable;
