import { Box, Select } from '@chakra-ui/react';
import React, { ChangeEventHandler } from 'react';

interface MarketItemToken {
  ticker: string;
  decimal: number;
  address: string;
}

export interface MarketItem {
  base: MarketItemToken;
  quote: MarketItemToken;
  fee: number;
  id: number;
}

export interface MarketSelectList {
  items: MarketItem[];
  value?: number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const MarketSelect: React.FC<MarketSelectList> = ({
  items,
  value,
  onChange,
}) => {
  return (
    <Box mb={3}>
      <Select placeholder="Select market" onChange={onChange} value={value}>
        {items.map(({ id, base, quote }) => (
          <option key={id} value={id}>
            {base.ticker} / {quote.ticker}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default MarketSelect;
