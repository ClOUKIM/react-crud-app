import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({
  handleEdit,
  initialExpenses,
  handleDelete,
  clearItems,
}) => {
  return (
    <>
      <ul className="list">
        {initialExpenses.map((expense) => {
          return (
            <ExpenseItem
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              expense={expense}
              key={expense.id}
            />
          );
        })}
      </ul>
      {ExpenseList.length > 0 && (
        <button className="btn" onClick={clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
