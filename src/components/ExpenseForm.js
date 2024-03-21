import React from "react";
import "./ExpenseForm.css";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  isEditing,
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">지출 항목</label>
          <input
            type="text"
            id="charge"
            name="charge"
            placeholder="예) 렌트비"
            value={charge}
            onChange={handleCharge}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense">비용</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="예) 1000"
            value={amount || ""}
            //shift + \ = | -> 값이 없을 경우의 기본값을 설정할 때 사용
            onChange={handleAmount}
          />
        </div>
      </div>
      <button className="btn" type="submit">
        {isEditing ? "수정" : "제출"}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;

//refce 사용
