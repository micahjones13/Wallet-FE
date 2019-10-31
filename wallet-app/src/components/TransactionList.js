import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionList = props => {
  //   console.log(props.user_id, "PROPS");
  //   console.log(props.list.recipient, "recip");
  return (
    <div>
      {props.list.sender === props.user_id ||
      props.list.recipient === props.user_id ? (
        <div>
          <p>Sender: {props.list.sender}</p>
          <p>Recipeint: {props.list.recipient}</p>
          <p>Amount: {props.list.amount}</p>
        </div>
      ) : (
        <p>No transactions for that id {props.id}</p>
      )}
    </div>
  );
};

export default TransactionList;

/*

  {props.list &&
        props.list.map(block => {
          return <TransactionItem info={block} />;
        })}


          return <TransactionItem transaction={transaction} id={props.id} />;




            {props.list.chain.map(block => {
        console.log(block.transactions, "block trans");
        block.transactions.map(transaction => {
          return <p>Sender: {transaction.sender}</p>;
        });
      })}
*/
