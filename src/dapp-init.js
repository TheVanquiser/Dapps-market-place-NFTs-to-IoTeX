function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function detectDivScroll(elem, resolver) {
    let height = $(elem).get(0).scrollHeight - $(elem).height();
    let scroll = $(elem).scrollTop();

    let isScrolledToEnd = (scroll + 150 >= height);
    if (isScrolledToEnd) {
        resolver('done');
    }
}

function waitForDiv(elem, itemCount) {
    $(elem).off('scroll');
    return new Promise(
        function (resolve, reject) {
            detectDivScroll(elem, resolve);
            $(elem).on('scroll', function () {
                detectDivScroll(elem, resolve);
            });
        }
    );
}

function waitForPaging(pageId, itemCount) {
    $(window).off('scroll');
    return new Promise(
        function (resolve, reject) {
            if (itemCount % 50 == 49) {
                $(window).on('scroll', function () {
                    let nearToBottom = window.screen.height;

                    if ($(window).scrollTop() + $(window).height() >=
                        $(document).height() - nearToBottom) {
                        console.log("Hit Shit");
                        resolve('done');
                    }
                });
            }
            else {

                resolve('done');
            }
        }
    );
}

$(document).ready(async function () {


    if (window.ethereum) {

        setTimeout(async function () {


            /*
            if(window.ethereum.isTrust){
                _alert('Trust Wallet not supported due to insufficient Web3 support. Please use Metamask or a wallet that fully supports Web3.');
                return;
            }*/


            try {

                // Request account access if needed
                await window.ethereum.enable();
                // Accounts now exposed
                resolve(web3);

                let chain = await web3.eth.getChainId();
                let actualChainId = chain.toString(16);

                console.log(actualChainId);

                if (actualChainId != chain_id) {

                    let chainName = '';
                    let rpcUrl = '';
                    let currencyName = '';
                    let currencySymbol = '';
                    let currencyDecimals = '';
                    let blockExplorerUrl = '';

                    let desc = 'You are not connected to ' + network + '. Please change to the right network in your wallet (Metamask) and reload.';

                    if (chain_id == '4690') {

                        chainName = 'IoTeX TEST NET';
                        rpcUrl = 'https://babel-api.testnet.iotex.io';
                        currencyName = 'Token State';
                        currencySymbol = 'IOTX';
                        currencyDecimals = 18;
                        blockExplorerUrl = 'https://testnet.iotex.io';

                        desc = 'You are not connected to the ' + chainName + '.<br/><br/>' +
                            'Please use the following setup in Metamask => Settings => Networks => Add Network: <br /><br />' +
                            'Network Name: ' + chainName + '<br/>' +
                            'New RPC URL: ' + rpcUrl + '<br/>' +
                            'ChainID:4690<br/>' +
                            'Symbol: ' + currencySymbol + '<br/>' +
                            'Block Explorer URL: N/A<br /><br/>' +
                            'More information on the setup, including how to receive test DEV <a href="https://docs.iotex.io/reference/babel-web3-api" target="_blank">here</a>.';


                    } else if (chain_id == '4689') {

                        chainName = 'IoTeX';
                        rpcUrl = 'https://babel-api.mainnet.iotex.io';
                        currencyName = 'Token State';
                        currencySymbol = 'IOTX';
                        currencyDecimals = 18;
                        blockExplorerUrl = 'https://iotexscan.io';

                        desc = 'You are not connected to the ' + chainName + '.<br/><br/>' +
                            'Please use the following setup in Metamask => Settings => Networks => Add Network: <br /><br />' +
                            'Network Name: ' + chainName + '<br/>' +
                            'New RPC URL: ' + rpcUrl + '<br/>' +
                            'ChainID: 4689<br/>' +
                            'Symbol: ' + currencySymbol + '<br/>' +
                            'Block Explorer URL: N/A<br /><br/>' +
                            'More information on the setup, including how to receive test DEV <a href="https://docs.iotex.io/reference/babel-web3-api" target="_blank">here</a>.';

                    }
                    desc += '<br /><br /><button class="btn btn-primary" onclick="location.reload()">Reload</button>';


                    try {
                        ethereum
                            .request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        "chainId": "0x" + chain_id,
                                        "chainName": chainName + '  @iotexnfts.firebaseapp.com',
                                        "rpcUrls": [rpcUrl],
                                        "nativeCurrency": {
                                            "name": currencyName,
                                            "symbol": currencySymbol,
                                            "decimals": currencyDecimals
                                        },
                                        "blockExplorerUrls": [blockExplorerUrl]
                                    }
                                ],
                            }).then(function () {
                                location.reload();
                            })
                            .catch(function (error) {

                                $('#alertModal').find('.modal-dialog').addClass('modal-lg')
                                _alert(desc);

                            });

                    } catch (e) {

                        $('#alertModal').find('.modal-dialog').addClass('modal-lg')
                        _alert(desc);
                    }

                } else {

                    if (typeof ethereum.enable == 'function' && ethereum.enable) {

                        await ethereum.enable();
                    }

                    run(true);
                }

            } catch (error) {
                reject(error);
            }

        }, 500);
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);

        if(typeof  window.web3 == 'undefined' || !window.web3) {
            window.web3 = new Web3(web3.currentProvider);
        }

        if (await web3.eth.net.getId() != chain_id.toString(16)) {

            let desc = 'You are not connected to ' + network;
            desc += '<br /><br /><button class="btn btn-primary" onclick="location.reload()">Try again and reload/button>';

            _alert(desc);
        }

        run(true);
    }

    // Non-dapp browsers...
    else {

        if (localStorage.getItem('torusLoaded') != 'true') {
            $('#torus').css('display', 'inline-block');
            runReadableOnly();
        } else {
            enableTorus();
        }
        /*$.getScript('https://cdn.jsdelivr.net/npm/@portis/web3@3.0.2/umd/index.js').done(function(){
            let chain = '4689';
            switch(chain_id){
                case '4689':
                    chain = 'IoTeX';
                    break;
            }
            if(chain != '0') {
                localStorage.setItem('useWallet', 'true');
                const portis = new Portis('baa31c5c-a6fe-4252-911f-7608fa1f8ebe', chain);
                window.web3 = new Web3(portis.provider);
                run(true);
            }
            else{
                _alert('Unsupported Network. You may still browser our dapp but not interact with the blockchain.');
                runReadableOnly();
            }
        });*/
    }
});

function enableTorus() {

    $.getScript('https://unpkg.com/@toruslabs/torus-embed').done(async function () {

        let chain = '0';
        let networkName = '';

        switch (chain_id) {
            case '4':
                chain = 'rinkeby';
                networkName = 'Rinkeby';
                break;
            case '4689':
                chain = 'https://babel-api.mainnet.iotex.io';
                networkName = 'IoTeX';
                break;
        }

        if (chain != '0') {

            const torus = new Torus({
                buttonPosition: "bottom-right" // default: bottom-left
            });
            await torus.init({
                buildEnv: "production", // default: production
                enableLogging: true, // default: false
                network: {
                    host: chain, // default: mainnet
                    chainId: chain_id, // default: 4689
                    networkName: networkName // default: IoTeX 
                },
                showTorusButton: true // default: true
            });

            $('#torus').css('display', 'none');
            localStorage.setItem('torusLoaded', 'true');

            await torus.login(); // await torus.ethereum.enable()
            window.web3 = new Web3(torus.provider);
            window.torus = torus;

            run(true);

        }
        else {

            runReadableOnly();
        }
    });
}

function runReadableOnly() {

    if (chain_id == '4689' || chain_id == '4690') {

        let rpcUrl = '';

        switch (chain_id) {
            case '4689':
                rpcUrl = 'https://babel-api.mainnet.iotex.io';
                break;

            case '4690':
                rpcUrl = 'https://babel-api.testnet.iotex.io';
                break;

            case '4':
                rpcUrl = 'https://rinkeby.infura.io/v3/4ed54a9c03b544da83d439644adae15e';
                break;

            default:
                rpcUrl = 'https://mainnet.infura.io/v3/4ed54a9c03b544da83d439644adae15e';
        }

        window.web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        run(true);

    } else {

        _alert('Please install a wallet like Metamask to use this dapp.');
    }

}
