class App {

    constructor() {
        this.web3Provider = null
        this.contracts = {}
        this. account = '0x0'
    }

    init() {
        return this.initWeb3()
    }

    initWeb3() {
        if (typeof web3 !== 'undefined') {
            this.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
            web3 = new Web3(this.web3Provider)
        }
        return this.initContract()
    }

    initContract() {
        $.getJSON("Election.json", (election) => {
            this.contracts.Election = TruffleContract(election)
            this.contracts.Election.setProvider(this.web3Provider)
            return this.render()
        })
    }

    render() {
        let electionInstance;
        let loader = $('#loader')
        let content = $('#content')
        $('#loader').show()
        content.hide()

        //Load Account Data
        web3.eth.getCoinbase((err, account) => {
            if (err === null) {
                this.account = account
                $('#accountAddress').html('Your account : ' + account)
            }
        })

        //Load contact data
        this.contracts.Election.deployed().then((instance) => {
            electionInstance = instance
            return electionInstance.candidatesCount()
        }).then((candidatesCount) => {
            let candidatesResults = $('#candidatesResults')
            $('#candidatesResults').empty()

            for (let i = 1; i <= candidatesCount; i++) {
                electionInstance.candidates(i).then((candidate) => {
                    let id = candidate[0]
                    let name = candidate[1]
                    let voteCount = candidate[2]

                    let candidateTemplate = '<tr><th>' + id + '</th><td>' + name + '</td><td>' + voteCount + '</td></tr>'
                    candidatesResults.append(candidateTemplate);
                })
            }
            loader.hide()
            content.show()
        }).catch((err) => {
            console.warn(err)
        })
    }
}

$(() => {
    $(window).load(() => {
        let app = new App()
        app.init()
    })
})
