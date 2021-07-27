FROM ethereum/client-go:stable

RUN mkdir -p /root/.ethereum/devchain
COPY scripts/docker/geth/static-nodes.json scripts/docker/geth/CustomGenesis.json scripts/docker/geth/pw /root/.ethereum/devchain/

# Create 2 accounts
RUN geth --datadir=/root/.ethereum/devchain account new --password /root/.ethereum/devchain/pw && \
    geth --datadir=/root/.ethereum/devchain account new --password /root/.ethereum/devchain/pw && \
    echo "***** Please backup this output below, it is your ethereum keys for the accounts *****" && \
    cat /root/.ethereum/devchain/keystore/*

RUN geth --datadir /root/.ethereum/devchain init /root/.ethereum/devchain/CustomGenesis.json