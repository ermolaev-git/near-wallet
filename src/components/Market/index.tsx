import { ConnectedWalletAccount } from 'near-api-js';
import React, { useEffect, useMemo, useState } from 'react';
import useContract from '../../hooks/useContract';
import MarketSelect, { MarketItem } from './MarketSelect';
import MarketTable, { MarketTableData } from './MarketTable';

export interface MarketProps {
  account: ConnectedWalletAccount;
}

const Market: React.FC<MarketProps> = ({ account }) => {
  const contract = useContract(account);

  const [markets, setMarkets] = useState<MarketItem[]>([]);
  const [selected, setSelected] = useState<number>(1);
  const [tableData, setTableData] = useState<MarketTableData | null>(null);

  const selectedMarket = useMemo(
    () => markets.find(({ id }) => id === selected),
    [selected, markets]
  );

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const data = await contract?.markets?.();

        if (data) {
          setMarkets(data);
        }
      } catch (error) {
        setMarkets([]);
      }
    };

    fetchMarkets();
  }, [contract]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        if (selected) {
          const data = await contract?.view_market?.({ market_id: selected });

          if (data) {
            setTableData(data);
          }
        }
      } catch (error) {
        setTableData(null);
      }
    };

    fetchMarketData();
  }, [selected, contract]);

  return (
    <div>
      <MarketSelect
        items={markets}
        value={selected}
        onChange={(e) => setSelected(parseInt(e.target.value, 10))}
      />

      {tableData && <MarketTable data={tableData} market={selectedMarket} />}
    </div>
  );
};

export default Market;
