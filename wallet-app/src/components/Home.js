import React from "react";
import axios from "axios";
import TranactionList from "./TransactionList.js";
import TransactionList from "./TransactionList.js";

class Home extends React.Component {
  state = {
    id: "",
    balance: "",
    data: [],
    old_ids: [],
    transactions: []
  };
  componentDidMount() {
    let transactionArr = [];

    axios
      .get("http://localhost:5000/chain")
      .then(res => {
        console.log(res, "res");
        res.data.chain.map(block => {
          block.transactions.map(transaction => {
            transactionArr.push(transaction);
          });
        });
        this.setState({
          data: res.data,
          transactions: transactionArr
        });
      })
      .catch(err => {
        console.log(err, "error");
      });
    //http://localhost:3500/chain
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = () => {
    this.setState({});
  };
  findBalance = () => {
    let coinCount = 0;

    if (this.state.id !== "") {
      this.state.data.chain.map(block => {
        // console.log(block, "BLOCK");
        block.transactions.map(transaction => {
          //   console.log(transaction, "TRANSACTION");
          if (transaction.recipient === this.state.id) {
            coinCount++;
          } else if (transaction.sender === this.state.id) {
            coinCount--;
          }
        });
      });
      console.log(coinCount, "COINS");
      this.setState({
        balance: coinCount
      });
    } else {
      console.log("no ID");
    }
  };
  showTranactions = () => {
    if (this.state.id !== "") {
      console.log("inside");
      this.state.data.chain.map(block => {
        block.transactions.map(transaction => {
          return (
            <div>
              <p>Sender: {transaction.sender}</p>
              <p>Recipient: {transaction.recipient}</p>
              <p>Amount: {transaction.amount}</p>
            </div>
          );
        });
      });
    }
  };
  handleSubmit = () => {
    let old_ids_arr = [];
    old_ids_arr = [...old_ids_arr, old_ids_arr.push(this.state.id)];
    console.log(old_ids_arr, "newstuff");
    // this.setState({
    //   old_ids: [this.state.old_ids.push(this.state.id)]
    // });
    console.log(this.state.old_ids, "OLD ids");
  };
  render() {
    return (
      <div>
        <input
          placeholder="ID"
          name="id"
          value={this.state.id}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Save ID</button>
        <p>Current ID: {this.state.id}</p>
        <div className="balance">
          Current balance for id {this.state.id} is {this.state.balance}
        </div>
        <button onClick={this.findBalance}>Find Balance</button>

        <div className="transaction-list">
          {this.state.data.length !== 0 && this.state.id !== "" ? (
            this.state.transactions.map(transaction => {
              return (
                <TransactionList list={transaction} user_id={this.state.id} />
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default Home;

/*


  findBalance = () => {
    let coinCount = 0;
    if (this.state.id !== "") {
      this.state.data.map(block => {
        if (block.transaction.recipient === this.state.id) {
          coinCount++;
        } else if (block.transaction.sender === this.state.id) {
          coinCount--;
        }
        return coinCount;
      });
      console.log(coinCount, "COINS");
      this.setState({
        balance: coinCount
      });
    } else {
      console.log("No ID in state");
    }
  };




      {this.state.id !== "" ? (
            this.state.data.chain.map(block => {
              block.transactions.map(transaction => {
                console.log(transaction);
                return (
                  <div>
                    <p>Sender: {transaction.sender}</p>
                  </div>
                );
              });
            })
          ) : (
            <p>No ID</p>
          )}




            <div className="transaction-list">
          {this.state.data.length !== 0 && this.state.id !== "" ? (
            <TransactionList list={this.state.data} id={this.state.id} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
*/
