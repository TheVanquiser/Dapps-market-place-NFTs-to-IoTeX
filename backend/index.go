Usage:
  Get Estimated Gas For Action
Request:
  Action: Action
Response:
  Gas: Gas
  ➜  ~ grpcurl -d '{"action": {"core": {"version": 1, "nonce": 2, "gasLimit": 10000, "gasPrice": "1000000000000", "execution": {"amount": "0", "contract": ""}}, "senderPubKey": "", "signature": ""}}' api.iotex.one:443 iotexapi.APIService.EstimateGasForAction

  {
	"gas": 10000
  }
Usage:
  Get Account Details
Request:
  Address: Account Encoded Address
Response:
  AccountMeta: Account Metadata
  ➜  ~ grpcurl -d '{"address": ""}' api.mainnet.iotex.one:443 iotexapi.APIService.GetAccount

{
  "accountMeta": {
    "address": "",
    "balance": "0",
    "nonce": "2",
    "pendingNonce": "3",
    "numActions": "2"
  }
}
Usage:
  Get Actions By Address
Request:
  ByAddr: GetActionsByAddressRequest
    -Address: Encoded Address
    -Start: Start Index of Actions
    -Count: Number of Actions
Resposne:
  ActionInfo: List of Action Info
  ➜  ~ grpcurl -d '{"byAddr": {"address": "", "start": 0, "count": 1}}' api.mainnet.iotex.one:443 iotexapi.APIService.GetActions

  Resolved method descriptor:
  rpc GetActions ( .iotexapi.GetActionsRequest ) returns ( .iotexapi.GetActionsResponse );
  
  Request metadata to send:
  (empty)
  
  Response headers received:
  content-type: application/grpc
  
  Response contents:
  {
	"actionInfo": [
	  {
		"action": {
		  "core": {
			"version": 1,
			"nonce": 1,
			"gasLimit": 10000,
			"gasPrice": "10000000000000",
			"transfer": {
			  "amount": "1000000000000000000",
			  "recipient": ""
			}
		  },
		  "senderPubKey": "BOk7WxyPumkmNlKkg61VMY5O7VtRIjFMt/2wd9jHKVCXzsku5QsRCNx0lalyDlkh5W0wSON6vmpnFtfJuRPp8uY=",
		  "signature": "9mrqFBggiRocZhkRVUswxs83NaEFNdEYYczI8049vlovHEP4YMQz+3Isznc3CrYaJxAbc2PTIz7y2meerJ8bHAA="
		},
		"actHash": "060a93a4784469f9e587da0c90ed20df58b0effb50d6b8ddcd9a4c65ad55fcbd",
		"blkHash": "6344115bcd43b7315ffdf5338d0f97b26caed7734efea034a27208f64670f5e9",
		"timestamp": "2019-04-17T00:10:30.468419Z"
	  }
	]
  }
  Usage:
  Get Action Receipt By Action Hash
Request:
  ActionHash: Action Hash
Response:
  Receipt: Action Receipt
  ➜  ~ grpcurl -d '{"actionHash": "dd2e83336f1ff219b1e54558f0627e1f556ed2caeedb44b758b0e107aa246531"}' api.mainnet.iotex.one:443 iotexapi.APIService.GetReceiptByAction
  {
	"receiptInfo": {
	  "receipt": {
		"status": "1",
		"blkHeight": "1",
		"actHash": "3S6DM28f8hmx5UVY8GJ+H1Vu0sru20S3WLDhB6okZTE=",
		"contractAddress": "",
		"logs": [
		  {
			"contractAddress": "",
			"data": "EilpbzFjNXp3aDI0cGM0ejg3dHF3NG02ejZjNHk1NDRwd3N2OG5ycm02NhoUMTYwMDAwMDAwMDAwMDAwMDAwMDA=",
			"blkHeight": "1",
			"actHash": "3S6DM28f8hmx5UVY8GJ+H1Vu0sru20S3WLDhB6okZTE="
		  }
		]
	  },
	  "blkHash": "230ba8095d5a505e355652f9dcc2b13605419a8fa3d3fd5ddc6d24fd6a902641"
	}
  }
