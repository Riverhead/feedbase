'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['feedbase'] = (function builder () {
  var environments = {
      'morden': {
        'objects': {
          'feedbase': {
            'class': 'Feedbase',
            'address': '0xe620388430113d498777b456d53f1d9689ee80f5'
          }
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  // Wrap pass-through functions by name.
  var passthroughs = ['at'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {
        'feedbase': {
          'class': 'Feedbase',
          'address': '0xe620388430113d498777b456d53f1d9689ee80f5'
        }
      }
    };
    }
    while (typeof env !== 'object') {
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Feedbase': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'fee',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'expiration',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'paid',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'token',
                'type': 'address'
              }
            ],
            'name': 'claim',
            'outputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'paymentNeeded',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'fee',
                'type': 'uint256'
              }
            ],
            'name': 'setFee',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'value',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'claim',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'description',
                'type': 'bytes32'
              }
            ],
            'name': 'setDescription',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'expired',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'transfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'read',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'free',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'readExpired',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'timestamp',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'token',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'expiration',
                'type': 'uint64'
              }
            ],
            'name': 'publish',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'description',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configure',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Pay',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052610f99806100126000396000f360606040523615610103576000357c0100000000000000000000000000000000000000000000000000000000900480630fdb468f146101055780631216e771146101315780631c2f38ff146101675780631e83409a146101935780631fb6e99d146101c957806321b36a08146101f5578063436cd650146102165780634d1f8c31146102425780634e71d92d14610284578063774343a6146102b15780637c79ebce146102d25780637ef09476146102fe57806389b8b4921461031f5780639e66cd381461034b578063be27fe6714610377578063c0171112146103a3578063cebce72d146103d9578063df9fb6df1461041b578063e86afde01461044557610103565b005b61011b60048080359060200190919050506104fa565b6040518082815260200191505060405180910390f35b6101476004808035906020019091905050610613565b604051808267ffffffffffffffff16815260200191505060405180910390f35b61017d600480803590602001909190505061065a565b6040518082815260200191505060405180910390f35b6101a960048080359060200190919050506107c2565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6101df600480803590602001909190505061076f565b6040518082815260200191505060405180910390f35b6102146004808035906020019091908035906020019091905050610a1d565b005b61022c6004808035906020019091905050610583565b6040518082815260200191505060405180910390f35b6102586004808035906020019091905050610471565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610291600480505061091c565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6102d06004808035906020019091908035906020019091905050610932565b005b6102e8600480803590602001909190505061069a565b6040518082815260200191505060405180910390f35b61031d6004808035906020019091908035906020019091905050610cc4565b005b6103356004808035906020019091905050610dd0565b6040518082815260200191505060405180910390f35b61036160048080359060200190919050506106ed565b6040518082815260200191505060405180910390f35b61038d6004808035906020019091905050610dfa565b6040518082815260200191505060405180910390f35b6103b960048080359060200190919050506105cc565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6103ef6004808035906020019091905050610530565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104436004808035906020019091908035906020019091908035906020019091905050610b1b565b005b61045b60048080359060200190919050506104c4565b6040518082815260200191505060405180910390f35b6000600060005082680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506104bf565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b506001016000505490506104f5565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060020160005054905061052b565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905061057e565b919050565b600061058e8261076f565b1561059857610002565b600060005082680100000000000000008110156100025790906006020160005b506004016000505490506105c7565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160009054906101000a900467ffffffffffffffff16905061060e565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160089054906101000a900467ffffffffffffffff169050610655565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160109054906101000a900460ff169050610695565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160089054906101000a900467ffffffffffffffff1667ffffffffffffffff16421190506106e8565b919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600060005083680100000000000000008110156100025790906006020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614905061076a565b919050565b600061077a826106ed565b1580156107b65750600060005082680100000000000000008110156100025790906006020160005b5060050160109054906101000a900460ff16155b90506107bd565b919050565b600068060000000000000000600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff021916908302179055509050805060006806000000000000000060009054906101000a900467ffffffffffffffff1667ffffffffffffffff16141561084257610002565b33600060005082680100000000000000008110156100025790906006020160005b5060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600060005082680100000000000000008110156100025790906006020160005b5060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508067ffffffffffffffff167fbaf0a95c82396a1fc892acdd1410329f7d8879d11ab493a9f95191eea48c39ab60405180905060405180910390a25b919050565b600061092860006107c2565b905061092f565b90565b81600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109b157610002565b81600060005084680100000000000000008110156100025790906006020160005b50600101600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b81600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a9c57610002565b610aa5836106ed565b15610aaf57610002565b81600060005084680100000000000000008110156100025790906006020160005b50600201600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b82600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b9a57610002565b82600060005085680100000000000000008110156100025790906006020160005b506004016000508190555042600060005085680100000000000000008110156100025790906006020160005b5060050160006101000a81548167ffffffffffffffff0219169083021790555081600060005085680100000000000000008110156100025790906006020160005b5060050160086101000a81548167ffffffffffffffff021916908302179055506000600060005085680100000000000000008110156100025790906006020160005b5060050160106101000a81548160ff021916908302179055508367ffffffffffffffff167fd1aff0bac0f5b5865918a92cb5919656a2a8ec2f9aa2c5969e913378e490416d60405180905060405180910390a2505b505050565b81600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d4357610002565b81600060005084680100000000000000008110156100025790906006020160005b5060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b6000610ddb8261069a565b15610de557610002565b610dee82610dfa565b9050610df5565b919050565b60006000600060005083680100000000000000008110156100025790906006020160005b509050610e2a8361076f565b15610f84578060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd338360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160005054604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001505060018160050160106101000a81548160ff021916908302179055508267ffffffffffffffff167f942a5650a208f118b6ae2ab78e2ebac011f3c6b2b1dd43c00995fbff7eeaa1c160405180905060405180910390a25b80600401600050549150610f93565b5091905056'
      },
      'FeedbaseEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configure',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Pay',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052600a8060106000396000f360606040526008565b00'
      },
      'FeedbaseTest': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes8'
              },
              {
                'name': 'b',
                'type': 'bytes8'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq8',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_set_description',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes30'
              },
              {
                'name': 'b',
                'type': 'bytes30'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq30',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes4'
              },
              {
                'name': 'b',
                'type': 'bytes4'
              }
            ],
            'name': 'assertEq4',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes27'
              },
              {
                'name': 'b',
                'type': 'bytes27'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq27',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'setUp',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes27'
              },
              {
                'name': 'b',
                'type': 'bytes27'
              }
            ],
            'name': 'assertEq27',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes18'
              },
              {
                'name': 'b',
                'type': 'bytes18'
              }
            ],
            'name': 'assertEq18',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'assertTrue',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes1'
              },
              {
                'name': 'b',
                'type': 'bytes1'
              }
            ],
            'name': 'assertEq1',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes18'
              },
              {
                'name': 'b',
                'type': 'bytes18'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq18',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes4'
              },
              {
                'name': 'b',
                'type': 'bytes4'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq4',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'int256'
              },
              {
                'name': 'b',
                'type': 'int256'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes8'
              },
              {
                'name': 'b',
                'type': 'bytes8'
              }
            ],
            'name': 'assertEq8',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes6'
              },
              {
                'name': 'b',
                'type': 'bytes6'
              }
            ],
            'name': 'assertEq6',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes26'
              },
              {
                'name': 'b',
                'type': 'bytes26'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq26',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes25'
              },
              {
                'name': 'b',
                'type': 'bytes25'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq25',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes7'
              },
              {
                'name': 'b',
                'type': 'bytes7'
              }
            ],
            'name': 'assertEq7',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes5'
              },
              {
                'name': 'b',
                'type': 'bytes5'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq5',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes11'
              },
              {
                'name': 'b',
                'type': 'bytes11'
              }
            ],
            'name': 'assertEq11',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes13'
              },
              {
                'name': 'b',
                'type': 'bytes13'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq13',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes23'
              },
              {
                'name': 'b',
                'type': 'bytes23'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq23',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes3'
              },
              {
                'name': 'b',
                'type': 'bytes3'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq3',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes15'
              },
              {
                'name': 'b',
                'type': 'bytes15'
              }
            ],
            'name': 'assertEq15',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes14'
              },
              {
                'name': 'b',
                'type': 'bytes14'
              }
            ],
            'name': 'assertEq14',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes32'
              },
              {
                'name': 'b',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq32',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes23'
              },
              {
                'name': 'b',
                'type': 'bytes23'
              }
            ],
            'name': 'assertEq23',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes26'
              },
              {
                'name': 'b',
                'type': 'bytes26'
              }
            ],
            'name': 'assertEq26',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes2'
              },
              {
                'name': 'b',
                'type': 'bytes2'
              }
            ],
            'name': 'assertEq2',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes13'
              },
              {
                'name': 'b',
                'type': 'bytes13'
              }
            ],
            'name': 'assertEq13',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'address'
              },
              {
                'name': 'b',
                'type': 'address'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes19'
              },
              {
                'name': 'b',
                'type': 'bytes19'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq19',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes20'
              },
              {
                'name': 'b',
                'type': 'bytes20'
              }
            ],
            'name': 'assertEq20',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes22'
              },
              {
                'name': 'b',
                'type': 'bytes22'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq22',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes12'
              },
              {
                'name': 'b',
                'type': 'bytes12'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq12',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_read_paid_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              },
              {
                'name': 'error',
                'type': 'bytes32'
              }
            ],
            'name': 'assertTrue',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes11'
              },
              {
                'name': 'b',
                'type': 'bytes11'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq11',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'testFail_read_expired_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes22'
              },
              {
                'name': 'b',
                'type': 'bytes22'
              }
            ],
            'name': 'assertEq22',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes28'
              },
              {
                'name': 'b',
                'type': 'bytes28'
              }
            ],
            'name': 'assertEq28',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes21'
              },
              {
                'name': 'b',
                'type': 'bytes21'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq21',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes16'
              },
              {
                'name': 'b',
                'type': 'bytes16'
              }
            ],
            'name': 'assertEq16',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes9'
              },
              {
                'name': 'b',
                'type': 'bytes9'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq9',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes3'
              },
              {
                'name': 'b',
                'type': 'bytes3'
              }
            ],
            'name': 'assertEq3',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes20'
              },
              {
                'name': 'b',
                'type': 'bytes20'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq20',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes28'
              },
              {
                'name': 'b',
                'type': 'bytes28'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq28',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_claim',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_read_paid_feed_twice',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes5'
              },
              {
                'name': 'b',
                'type': 'bytes5'
              }
            ],
            'name': 'assertEq5',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes15'
              },
              {
                'name': 'b',
                'type': 'bytes15'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq15',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_target',
                'type': 'address'
              }
            ],
            'name': 'expectEventsExact',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes17'
              },
              {
                'name': 'b',
                'type': 'bytes17'
              }
            ],
            'name': 'assertEq17',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes7'
              },
              {
                'name': 'b',
                'type': 'bytes7'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq7',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'uint256'
              },
              {
                'name': 'b',
                'type': 'uint256'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_transfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes1'
              },
              {
                'name': 'b',
                'type': 'bytes1'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq1',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes21'
              },
              {
                'name': 'b',
                'type': 'bytes21'
              }
            ],
            'name': 'assertEq21',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes6'
              },
              {
                'name': 'b',
                'type': 'bytes6'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq6',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'assertFalse',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes16'
              },
              {
                'name': 'b',
                'type': 'bytes16'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq16',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_events',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'fail',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              },
              {
                'name': 'error',
                'type': 'bytes32'
              }
            ],
            'name': 'assertFalse',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes32'
              },
              {
                'name': 'b',
                'type': 'bytes32'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq32',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes29'
              },
              {
                'name': 'b',
                'type': 'bytes29'
              }
            ],
            'name': 'assertEq29',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'failed',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes14'
              },
              {
                'name': 'b',
                'type': 'bytes14'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq14',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'testFail_read_paid_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes2'
              },
              {
                'name': 'b',
                'type': 'bytes2'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq2',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes17'
              },
              {
                'name': 'b',
                'type': 'bytes17'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq17',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes19'
              },
              {
                'name': 'b',
                'type': 'bytes19'
              }
            ],
            'name': 'assertEq19',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes24'
              },
              {
                'name': 'b',
                'type': 'bytes24'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq24',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes9'
              },
              {
                'name': 'b',
                'type': 'bytes9'
              }
            ],
            'name': 'assertEq9',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes10'
              },
              {
                'name': 'b',
                'type': 'bytes10'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq10',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'testFail_set_fee_without_token',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'address'
              },
              {
                'name': 'b',
                'type': 'address'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes12'
              },
              {
                'name': 'b',
                'type': 'bytes12'
              }
            ],
            'name': 'assertEq12',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes30'
              },
              {
                'name': 'b',
                'type': 'bytes30'
              }
            ],
            'name': 'assertEq30',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes29'
              },
              {
                'name': 'b',
                'type': 'bytes29'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq29',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_read_free_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes25'
              },
              {
                'name': 'b',
                'type': 'bytes25'
              }
            ],
            'name': 'assertEq25',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'uint256'
              },
              {
                'name': 'b',
                'type': 'uint256'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bool'
              },
              {
                'name': 'b',
                'type': 'bool'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes'
              },
              {
                'name': 'b',
                'type': 'bytes'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq0',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes31'
              },
              {
                'name': 'b',
                'type': 'bytes31'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq31',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes'
              },
              {
                'name': 'b',
                'type': 'bytes'
              }
            ],
            'name': 'assertEq0',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes24'
              },
              {
                'name': 'b',
                'type': 'bytes24'
              }
            ],
            'name': 'assertEq24',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bool'
              },
              {
                'name': 'b',
                'type': 'bool'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes10'
              },
              {
                'name': 'b',
                'type': 'bytes10'
              }
            ],
            'name': 'assertEq10',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'IS_TEST',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes31'
              },
              {
                'name': 'b',
                'type': 'bytes31'
              }
            ],
            'name': 'assertEq31',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'int256'
              },
              {
                'name': 'b',
                'type': 'int256'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configure',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Pay',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_target',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'exact',
                'type': 'bool'
              }
            ],
            'name': 'eventListener',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'logs',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bool'
              }
            ],
            'name': 'log_bool',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bool'
              }
            ],
            'name': 'log_named_bool',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              }
            ],
            'name': 'log_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              }
            ],
            'name': 'log_named_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              }
            ],
            'name': 'log_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              }
            ],
            'name': 'log_named_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'address'
              }
            ],
            'name': 'log_address',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'address'
              }
            ],
            'name': 'log_named_address',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'log_bytes',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'log_named_bytes',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes1'
              }
            ],
            'name': 'log_bytes1',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes1'
              }
            ],
            'name': 'log_named_bytes1',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes2'
              }
            ],
            'name': 'log_bytes2',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes2'
              }
            ],
            'name': 'log_named_bytes2',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes3'
              }
            ],
            'name': 'log_bytes3',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes3'
              }
            ],
            'name': 'log_named_bytes3',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes4'
              }
            ],
            'name': 'log_bytes4',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes4'
              }
            ],
            'name': 'log_named_bytes4',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes5'
              }
            ],
            'name': 'log_bytes5',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes5'
              }
            ],
            'name': 'log_named_bytes5',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes6'
              }
            ],
            'name': 'log_bytes6',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes6'
              }
            ],
            'name': 'log_named_bytes6',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes7'
              }
            ],
            'name': 'log_bytes7',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes7'
              }
            ],
            'name': 'log_named_bytes7',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes8'
              }
            ],
            'name': 'log_bytes8',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes8'
              }
            ],
            'name': 'log_named_bytes8',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes9'
              }
            ],
            'name': 'log_bytes9',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes9'
              }
            ],
            'name': 'log_named_bytes9',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes10'
              }
            ],
            'name': 'log_bytes10',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes10'
              }
            ],
            'name': 'log_named_bytes10',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes11'
              }
            ],
            'name': 'log_bytes11',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes11'
              }
            ],
            'name': 'log_named_bytes11',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes12'
              }
            ],
            'name': 'log_bytes12',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes12'
              }
            ],
            'name': 'log_named_bytes12',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes13'
              }
            ],
            'name': 'log_bytes13',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes13'
              }
            ],
            'name': 'log_named_bytes13',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes14'
              }
            ],
            'name': 'log_bytes14',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes14'
              }
            ],
            'name': 'log_named_bytes14',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes15'
              }
            ],
            'name': 'log_bytes15',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes15'
              }
            ],
            'name': 'log_named_bytes15',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes16'
              }
            ],
            'name': 'log_bytes16',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes16'
              }
            ],
            'name': 'log_named_bytes16',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes17'
              }
            ],
            'name': 'log_bytes17',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes17'
              }
            ],
            'name': 'log_named_bytes17',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes18'
              }
            ],
            'name': 'log_bytes18',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes18'
              }
            ],
            'name': 'log_named_bytes18',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes19'
              }
            ],
            'name': 'log_bytes19',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes19'
              }
            ],
            'name': 'log_named_bytes19',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes20'
              }
            ],
            'name': 'log_bytes20',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes20'
              }
            ],
            'name': 'log_named_bytes20',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes21'
              }
            ],
            'name': 'log_bytes21',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes21'
              }
            ],
            'name': 'log_named_bytes21',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes22'
              }
            ],
            'name': 'log_bytes22',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes22'
              }
            ],
            'name': 'log_named_bytes22',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes23'
              }
            ],
            'name': 'log_bytes23',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes23'
              }
            ],
            'name': 'log_named_bytes23',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes24'
              }
            ],
            'name': 'log_bytes24',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes24'
              }
            ],
            'name': 'log_named_bytes24',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes25'
              }
            ],
            'name': 'log_bytes25',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes25'
              }
            ],
            'name': 'log_named_bytes25',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes26'
              }
            ],
            'name': 'log_bytes26',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes26'
              }
            ],
            'name': 'log_named_bytes26',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes27'
              }
            ],
            'name': 'log_bytes27',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes27'
              }
            ],
            'name': 'log_named_bytes27',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes28'
              }
            ],
            'name': 'log_bytes28',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes28'
              }
            ],
            'name': 'log_named_bytes28',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes29'
              }
            ],
            'name': 'log_bytes29',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes29'
              }
            ],
            'name': 'log_named_bytes29',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes30'
              }
            ],
            'name': 'log_bytes30',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes30'
              }
            ],
            'name': 'log_named_bytes30',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes31'
              }
            ],
            'name': 'log_bytes31',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes31'
              }
            ],
            'name': 'log_named_bytes31',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes32'
              }
            ],
            'name': 'log_bytes32',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes32'
              }
            ],
            'name': 'log_named_bytes32',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'gas',
                'type': 'uint256'
              }
            ],
            'name': '_log_gas_use',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052604051610fab8061012e833901809050604051809103906000f0600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506103e860405161075c806110d983390180828152602001915050604051809103906000f0600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506040516101e880611835833901809050604051809103906000f0600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b30600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506001600160146101000a81548160ff021916908302179055505b61a03d80611a1d6000396000f36060604052610f99806100126000396000f360606040523615610103576000357c0100000000000000000000000000000000000000000000000000000000900480630fdb468f146101055780631216e771146101315780631c2f38ff146101675780631e83409a146101935780631fb6e99d146101c957806321b36a08146101f5578063436cd650146102165780634d1f8c31146102425780634e71d92d14610284578063774343a6146102b15780637c79ebce146102d25780637ef09476146102fe57806389b8b4921461031f5780639e66cd381461034b578063be27fe6714610377578063c0171112146103a3578063cebce72d146103d9578063df9fb6df1461041b578063e86afde01461044557610103565b005b61011b60048080359060200190919050506104fa565b6040518082815260200191505060405180910390f35b6101476004808035906020019091905050610613565b604051808267ffffffffffffffff16815260200191505060405180910390f35b61017d600480803590602001909190505061065a565b6040518082815260200191505060405180910390f35b6101a960048080359060200190919050506107c2565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6101df600480803590602001909190505061076f565b6040518082815260200191505060405180910390f35b6102146004808035906020019091908035906020019091905050610a1d565b005b61022c6004808035906020019091905050610583565b6040518082815260200191505060405180910390f35b6102586004808035906020019091905050610471565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610291600480505061091c565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6102d06004808035906020019091908035906020019091905050610932565b005b6102e8600480803590602001909190505061069a565b6040518082815260200191505060405180910390f35b61031d6004808035906020019091908035906020019091905050610cc4565b005b6103356004808035906020019091905050610dd0565b6040518082815260200191505060405180910390f35b61036160048080359060200190919050506106ed565b6040518082815260200191505060405180910390f35b61038d6004808035906020019091905050610dfa565b6040518082815260200191505060405180910390f35b6103b960048080359060200190919050506105cc565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6103ef6004808035906020019091905050610530565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104436004808035906020019091908035906020019091908035906020019091905050610b1b565b005b61045b60048080359060200190919050506104c4565b6040518082815260200191505060405180910390f35b6000600060005082680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506104bf565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b506001016000505490506104f5565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060020160005054905061052b565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905061057e565b919050565b600061058e8261076f565b1561059857610002565b600060005082680100000000000000008110156100025790906006020160005b506004016000505490506105c7565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160009054906101000a900467ffffffffffffffff16905061060e565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160089054906101000a900467ffffffffffffffff169050610655565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160109054906101000a900460ff169050610695565b919050565b6000600060005082680100000000000000008110156100025790906006020160005b5060050160089054906101000a900467ffffffffffffffff1667ffffffffffffffff16421190506106e8565b919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600060005083680100000000000000008110156100025790906006020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614905061076a565b919050565b600061077a826106ed565b1580156107b65750600060005082680100000000000000008110156100025790906006020160005b5060050160109054906101000a900460ff16155b90506107bd565b919050565b600068060000000000000000600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff021916908302179055509050805060006806000000000000000060009054906101000a900467ffffffffffffffff1667ffffffffffffffff16141561084257610002565b33600060005082680100000000000000008110156100025790906006020160005b5060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600060005082680100000000000000008110156100025790906006020160005b5060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508067ffffffffffffffff167fbaf0a95c82396a1fc892acdd1410329f7d8879d11ab493a9f95191eea48c39ab60405180905060405180910390a25b919050565b600061092860006107c2565b905061092f565b90565b81600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109b157610002565b81600060005084680100000000000000008110156100025790906006020160005b50600101600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b81600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a9c57610002565b610aa5836106ed565b15610aaf57610002565b81600060005084680100000000000000008110156100025790906006020160005b50600201600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b82600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b9a57610002565b82600060005085680100000000000000008110156100025790906006020160005b506004016000508190555042600060005085680100000000000000008110156100025790906006020160005b5060050160006101000a81548167ffffffffffffffff0219169083021790555081600060005085680100000000000000008110156100025790906006020160005b5060050160086101000a81548167ffffffffffffffff021916908302179055506000600060005085680100000000000000008110156100025790906006020160005b5060050160106101000a81548160ff021916908302179055508367ffffffffffffffff167fd1aff0bac0f5b5865918a92cb5919656a2a8ec2f9aa2c5969e913378e490416d60405180905060405180910390a2505b505050565b81600060005081680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d4357610002565b81600060005084680100000000000000008110156100025790906006020160005b5060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b6000610ddb8261069a565b15610de557610002565b610dee82610dfa565b9050610df5565b919050565b60006000600060005083680100000000000000008110156100025790906006020160005b509050610e2a8361076f565b15610f84578060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd338360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160005054604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001505060018160050160106101000a81548160ff021916908302179055508267ffffffffffffffff167f942a5650a208f118b6ae2ab78e2ebac011f3c6b2b1dd43c00995fbff7eeaa1c160405180905060405180910390a25b80600401600050549150610f93565b5091905056606060405260405160208061075c833981016040528080519060200190919050505b80600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550806002600050819055505b506106ed8061006f6000396000f360606040523615610074576000357c010000000000000000000000000000000000000000000000000000000090048063095ea7b31461007657806318160ddd146100ab57806323b872dd146100ce57806370a082311461010c578063a9059cbb14610138578063dd62ed3e1461016d57610074565b005b610095600480803590602001909190803590602001909190505061059b565b6040518082815260200191505060405180910390f35b6100b860048050506101a2565b6040518082815260200191505060405180910390f35b6100f66004808035906020019091908035906020019091908035906020019091905050610360565b6040518082815260200191505060405180910390f35b61012260048080359060200190919050506101b4565b6040518082815260200191505060405180910390f35b61015760048080359060200190919080359060200190919050506101f2565b6040518082815260200191505060405180910390f35b61018c600480803590602001909190803590602001909190505061066f565b6040518082815260200191505060405180910390f35b600060026000505490506101b1565b90565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506101ed565b919050565b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101561023057610002565b610269600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054836106d8565b151561027457610002565b81600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061035a565b92915050565b600081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101561039e57610002565b81600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101561040457610002565b61043d600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054836106d8565b151561044857610002565b81600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610594565b9392505050565b600081600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a360019050610669565b92915050565b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506106d2565b92915050565b600082828401101590506106e7565b929150505660606040526101d6806100126000396000f360606040523615610048576000357c0100000000000000000000000000000000000000000000000000000000900480634bbb216c146100b657806389b8b492146100ce57610048565b6100b45b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378201915050925050506000604051808303816000866161da5a03f1915050505b565b005b6100cc60048080359060200190919050506100fa565b005b6100e46004808035906020019091905050610129565b6040518082815260200191505060405180910390f35b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b49283604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506101d1565b9190505660606040523615610431576000357c010000000000000000000000000000000000000000000000000000000090048063054550f314610433578063055523431461045d578063066b03801461046c57806309d78fba146104965780630a3d7cce146104b75780630a9254e4146104e15780630b0788dc146104f05780630b967fe7146105115780630c9fd581146105325780631472d56a1461054a57806316783ba71461056b57806319a7e59d14610595578063200b894d146105bf578063263eb5b6146105e9578063269724ef1461060a5780632bdc05c51461062b5780632d0daca81461065557806334d9aee31461067f57806338856ecb146106a057806338ec8736146106ca5780633b098c8c146106eb5780633b81a5a4146107155780633d82e1b11461073f5780634631e15b146107695780634651f7161461078a57806347428855146107ab5780634b0df486146107cc5780634c2bc9a9146107ed5780634c4a4c671461080e5780635142c3ec1461082f578063515361f614610850578063538e8ae014610871578063593af09f1461089b578063596c02fb146108bc5780635d8bc2a8146108e65780635d9b84af14610910578063640ec47a1461091f57806365153632146109405780636afcc1d11461096a5780636b2f68f5146109795780636ec62f291461099a57806370ab2822146109bb57806374780111146109e557806374b9dc6b14610a065780637857fcda14610a30578063787eda4914610a515780637963b47814610a7b5780637ce8e19614610aa557806381dba0d614610ab457806384570d0d14610ac35780638667346414610ae45780638af784dc14610b0e5780638eb976ca14610b265780638f12355d14610b4757806398296c5414610b715780639c45706d14610b925780639c90224b14610ba15780639fb4c63d14610bcb578063a536cffd14610bec578063a598288514610c16578063a6abbad614610c2e578063a88d42a514610c58578063a9cc471814610c67578063aae764c114610c76578063b017d80814610c97578063b8d3d08a14610cc1578063ba414fa614610ce2578063bd85396014610d05578063cbdaea8b14610d2f578063ccc62bbe14610d3e578063cf06b14114610d68578063cfd65fdb14610d92578063d050498e14610db3578063d1a3d3ad14610ddd578063d539a22614610dfe578063d9a9364d14610e28578063e204758914610e37578063e4dbc38514610e61578063e504862b14610e82578063e695c00c14610ea3578063e79c587614610ecd578063e7fa796914610edc578063e85efc5014610efd578063f10968ea14610f27578063f1183e2114610f51578063f43313b614610ff7578063f578fd8514611021578063f614fd72146110be578063f7fe3477146110df578063f8bdbb6014611100578063fa7626d414611121578063fc03777614611144578063fe74f05b1461116557610431565b005b61045b6004808035906020019091908035906020019091908035906020019091905050613544565b005b61046a60048050506179d6565b005b6104946004808035906020019091908035906020019091908035906020019091905050616f30565b005b6104b56004808035906020019091908035906020019091905050612c29565b005b6104df600480803590602001909190803590602001909190803590602001909190505061674a565b005b6104ee6004805050617716565b005b61050f60048080359060200190919080359060200190919050506168b7565b005b6105306004808035906020019091908035906020019091905050615105565b005b6105486004808035906020019091905050611222565b005b6105696004808035906020019091908035906020019091905050612443565b005b6105936004808035906020019091908035906020019091908035906020019091905050614f98565b005b6105bd6004808035906020019091908035906020019091908035906020019091905050612abc565b005b6105e76004808035906020019091908035906020019091908035906020019091905050611ce2565b005b61060860048080359060200190919080359060200190919050506136b1565b005b610629600480803590602001909190803590602001909190505061316d565b005b61065360048080359060200190919080359060200190919080359060200190919050506164a8565b005b61067d6004808035906020019091908035906020019091908035906020019091905050616206565b005b61069e600480803590602001909190803590602001909190505061340f565b005b6106c86004808035906020019091908035906020019091908035906020019091905050612d5e565b005b6106e96004808035906020019091908035906020019091905050613e97565b005b610713600480803590602001909190803590602001909190803590602001909190505061426e565b005b61073d6004808035906020019091908035906020019091908035906020019091905050615cc2565b005b610767600480803590602001909190803590602001909190803590602001909190505061281a565b005b610788600480803590602001909190803590602001909190505061491f565b005b6107a9600480803590602001909190803590602001909190505061467d565b005b6107ca60048080359060200190919080359060200190919050506175e1565b005b6107eb6004808035906020019091908035906020019091905050615e2f565b005b61080c6004808035906020019091908035906020019091905050616615565b005b61082d60048080359060200190919080359060200190919050506126e5565b005b61084e60048080359060200190919080359060200190919050506143db565b005b61086f6004808035906020019091908035906020019091905050612149565b005b610899600480803590602001909190803590602001909190803590602001909190505061523a565b005b6108ba6004808035906020019091908035906020019091905050615649565b005b6108e46004808035906020019091908035906020019091908035906020019091905050615a20565b005b61090e6004808035906020019091908035906020019091908035906020019091905050613fcc565b005b61091d6004805050617e51565b005b61093e60048080359060200190919080359060200190919050506112a1565b005b6109686004808035906020019091908035906020019091908035906020019091905050613d2a565b005b61097760048050506194c3565b005b6109986004808035906020019091908035906020019091905050615b8d565b005b6109b96004808035906020019091908035906020019091905050616b59565b005b6109e3600480803590602001909190803590602001909190803590602001909190505061577e565b005b610a046004808035906020019091908035906020019091905050614bc1565b005b610a2e60048080359060200190919080359060200190919080359060200190919050506137e6565b005b610a4f6004808035906020019091908035906020019091905050612987565b005b610a7960048080359060200190919080359060200190919080359060200190919050506154dc565b005b610aa360048080359060200190919080359060200190919080359060200190919050506169ec565b005b610ab260048050506178c7565b005b610ac16004805050618c52565b005b610ae26004808035906020019091908035906020019091905050612ecb565b005b610b0c60048080359060200190919080359060200190919080359060200190919050506147b2565b005b610b2460048080359060200190919050506111ac565b005b610b456004808035906020019091908035906020019091905050614e63565b005b610b6f60048080359060200190919080359060200190919080359060200190919050506132a2565b005b610b906004808035906020019091908035906020019091905050611bad565b005b610b9f6004805050619648565b005b610bc960048080359060200190919080359060200190919080359060200190919050506122d6565b005b610bea60048080359060200190919080359060200190919050506158eb565b005b610c146004808035906020019091908035906020019091908035906020019091905050613000565b005b610c2c6004808035906020019091905050611358565b005b610c566004808035906020019091908035906020019091908035906020019091905050614a54565b005b610c6560048050506198c6565b005b610c746004805050611206565b005b610c9560048080359060200190919080359060200190919050506113d6565b005b610cbf6004808035906020019091908035906020019091908035906020019091905050617474565b005b610ce06004808035906020019091908035906020019091905050616dfb565b005b610cef6004805050611199565b6040518082815260200191505060405180910390f35b610d2d6004808035906020019091908035906020019091908035906020019091905050614510565b005b610d3c60048050506186e5565b005b610d666004808035906020019091908035906020019091908035906020019091905050612578565b005b610d906004808035906020019091908035906020019091908035906020019091905050614cf6565b005b610db160048080359060200190919080359060200190919050506153a7565b005b610ddb6004808035906020019091908035906020019091908035906020019091905050615f64565b005b610dfc6004808035906020019091908035906020019091905050613953565b005b610e266004808035906020019091908035906020019091908035906020019091905050613a88565b005b610e356004805050617d1e565b005b610e5f6004808035906020019091908035906020019091908035906020019091905050611f84565b005b610e806004808035906020019091908035906020019091905050614139565b005b610ea1600480803590602001909190803590602001909190505061709d565b005b610ecb6004808035906020019091908035906020019091908035906020019091905050616c8e565b005b610eda6004805050617b8d565b005b610efb6004808035906020019091908035906020019091905050616373565b005b610f256004808035906020019091908035906020019091908035906020019091905050611a40565b005b610f4f600480803590602001909190803590602001909190803590602001909190505061179e565b005b610ff56004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919080359060200190919050506115f9565b005b61101f60048080359060200190919080359060200190919080359060200190919050506171d2565b005b6110bc6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190505061148c565b005b6110dd60048080359060200190919080359060200190919050506160d1565b005b6110fe600480803590602001909190803590602001909190505061190b565b005b61111f6004808035906020019091908035906020019091905050613bf5565b005b61112e6004805050611186565b6040518082815260200191505060405180910390f35b611163600480803590602001909190803590602001909190505061733f565b005b6111846004808035906020019091908035906020019091905050611e4f565b005b600160149054906101000a900460ff1681565b600160159054906101000a900460ff1681565b7f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8816001604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b50565b6001600160156101000a81548160ff021916908302179055505b565b80151561129d577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727454727565207761732066616c736500000000000000000000000081526020015060200191505060405180910390a161129c611206565b5b5b50565b811515611353577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727454727565207761732066616c736500000000000000000000000081526020015060200191505060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a1611352611206565b5b5b5050565b80156113d2577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727446616c736520776173207472756500000000000000000000000081526020015060200191505060405180910390a16113d1611206565b5b5b50565b8115611487577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727446616c736520776173207472756500000000000000000000000081526020015060200191505060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a1611486611206565b5b5b5050565b6000600060008451925060019150828451141561158057600090505b828160ff16101561157b5783818151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000285828151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000214151561156d576000915081505b5b80806001019150506114a8565b611587565b6000915081505b8115156115f1577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f6661696c65642061737365727445712862797465732900000000000000000000815260200150602001905060405180910390a16115f0611206565b5b5b5050505050565b600060006000855192506001915082855114156116ed57600090505b828160ff1610156116e85784818151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000286828151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000021415156116da576000915081505b5b8080600101915050611615565b6116f4565b6000915081505b811515611795577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f6661696c65642061737365727445712862797465732900000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3846040518082815260200191505060405180910390a1611794611206565b5b5b505050505050565b8183141515611905577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1611904611206565b5b5b505050565b8082141515611a3b577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1611a3a611206565b5b5b5050565b8183141515611ba7577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1611ba6611206565b5b5b505050565b8082141515611cdd577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1611cdc611206565b5b5b5050565b8183141515611e49577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1611e48611206565b5b5b505050565b8082141515611f7f577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1611f7e611206565b5b5b5050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515612143577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258360405180807f41000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258260405180807f42000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1612142611206565b5b5b505050565b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415156122d1577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258260405180807f41000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258160405180807f42000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16122d0611206565b5b5b5050565b818314151561243d577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161243c611206565b5b5b505050565b8082141515612573577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612572611206565b5b5b5050565b81831415156126df577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16126de611206565b5b5b505050565b8082141515612815577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612814611206565b5b5b5050565b8183141515612981577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612980611206565b5b5b505050565b8082141515612ab7577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612ab6611206565b5b5b5050565b8183141515612c23577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612c22611206565b5b5b505050565b8082141515612d59577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612d58611206565b5b5b5050565b8183141515612ec5577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612ec4611206565b5b5b505050565b8082141515612ffb577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1612ffa611206565b5b5b5050565b8183141515613167577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613166611206565b5b5b505050565b808214151561329d577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161329c611206565b5b5b5050565b8183141515613409577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613408611206565b5b5b505050565b808214151561353f577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161353e611206565b5b5b5050565b81831415156136ab577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16136aa611206565b5b5b505050565b80821415156137e1577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16137e0611206565b5b5b5050565b818314151561394d577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161394c611206565b5b5b505050565b8082141515613a83577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613a82611206565b5b5b5050565b8183141515613bef577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613bee611206565b5b5b505050565b8082141515613d25577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613d24611206565b5b5b5050565b8183141515613e91577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613e90611206565b5b5b505050565b8082141515613fc7577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1613fc6611206565b5b5b5050565b8183141515614133577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614132611206565b5b5b505050565b8082141515614269577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614268611206565b5b5b5050565b81831415156143d5577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16143d4611206565b5b5b505050565b808214151561450b577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161450a611206565b5b5b5050565b8183141515614677577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614676611206565b5b5b505050565b80821415156147ad577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16147ac611206565b5b5b5050565b8183141515614919577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614918611206565b5b5b505050565b8082141515614a4f577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614a4e611206565b5b5b5050565b8183141515614bbb577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614bba611206565b5b5b505050565b8082141515614cf1577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614cf0611206565b5b5b5050565b8183141515614e5d577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614e5c611206565b5b5b505050565b8082141515614f93577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614f92611206565b5b5b5050565b81831415156150ff577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16150fe611206565b5b5b505050565b8082141515615235577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615234611206565b5b5b5050565b81831415156153a1577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16153a0611206565b5b5b505050565b80821415156154d7577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16154d6611206565b5b5b5050565b8183141515615643577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615642611206565b5b5b505050565b8082141515615779577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615778611206565b5b5b5050565b81831415156158e5577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16158e4611206565b5b5b505050565b8082141515615a1b577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615a1a611206565b5b5b5050565b8183141515615b87577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615b86611206565b5b5b505050565b8082141515615cbd577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615cbc611206565b5b5b5050565b8183141515615e29577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615e28611206565b5b5b505050565b8082141515615f5f577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615f5e611206565b5b5b5050565b81831415156160cb577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16160ca611206565b5b5b505050565b8082141515616201577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616200611206565b5b5b5050565b818314151561636d577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161636c611206565b5b5b505050565b80821415156164a3577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16164a2611206565b5b5b5050565b818314151561660f577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161660e611206565b5b5b505050565b8082141515616745577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616744611206565b5b5b5050565b81831415156168b1577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16168b0611206565b5b5b505050565b80821415156169e7577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16169e6611206565b5b5b5050565b8183141515616b53577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616b52611206565b5b5b505050565b8082141515616c89577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616c88611206565b5b5b5050565b8183141515616df5577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616df4611206565b5b5b505050565b8082141515616f2b577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616f2a611206565b5b5b5050565b8183141515617097577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617096611206565b5b5b505050565b80821415156171cd577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16171cc611206565b5b5b5050565b8183141515617339577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617338611206565b5b5b505050565b808214151561746f577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161746e611206565b5b5b5050565b81831415156175db577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16175da611206565b5b5b505050565b8082141515617711577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617710611206565b5b5b5050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e83409a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150600460146101000a81548167ffffffffffffffff021916908302179055505b565b6178f2600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff166000611bad565b6179d3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e83409a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015067ffffffffffffffff166001611bad565b5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663774343a6600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff168152602001807f666f6f00000000000000000000000000000000000000000000000000000000008152602001506020019150506000604051808303816000876161da5a03f11561000257505050617b8a7f666f6f0000000000000000000000000000000000000000000000000000000000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e86afde0600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001506175e1565b5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f11561000257505050617d1b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015060426001026175e1565b5b565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08826064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f115610002575050505b50565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f115610002575050506183e0600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001506064611bad565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506185fb82600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150036064611bad565b6186d2600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001506000611bad565b6186e08160426001026175e1565b5b5050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166063604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150505b565b60006000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509450600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509250600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506194928584036064611bad565b61949f8382036000611bad565b6194ad8460426001026175e1565b6194bb8260426001026175e1565b5b5050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff16604260014203604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150505b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ef09476600460149054906101000a900467ffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff1661012360014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f115610002575050506198c3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001506101236001026175e1565b5b565b60006198f3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166111ac565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166000604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663774343a6600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff168152602001807f666f6f00000000000000000000000000000000000000000000000000000000008152602001506020019150506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663df9fb6df600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff1681526020018360010281526020018267ffffffffffffffff16815260200193505050506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fd1aff0bac0f5b5865918a92cb5919656a2a8ec2f9aa2c5969e913378e490416d60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167f942a5650a208f118b6ae2ab78e2ebac011f3c6b2b1dd43c00995fbff7eeaa1c160405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ef09476600460149054906101000a900467ffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e83409a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090508067ffffffffffffffff167fbaf0a95c82396a1fc892acdd1410329f7d8879d11ab493a9f95191eea48c39ab60405180905060405180910390a25b5056'
      },
      'FeedbaseTester': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              }
            ],
            'name': '_target',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'read',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          }
        ],
        'bytecode': '60606040526101d6806100126000396000f360606040523615610048576000357c0100000000000000000000000000000000000000000000000000000000900480634bbb216c146100b657806389b8b492146100ce57610048565b6100b45b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378201915050925050506000604051808303816000866161da5a03f1915050505b565b005b6100cc60048080359060200190919050506100fa565b005b6100e46004808035906020019091905050610129565b6040518082815260200191505060405180910390f35b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b49283604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506101d1565b91905056'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['class']].at(obj.address);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['feedbase'];
}
