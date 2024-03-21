import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1500 },
    { id: 2, charge: "교통비", amount: 3000 },
  ]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const [id, SetId] = useState("");

  const [edit, setEdit] = useState(false);

  const [alert, setAlert] = useState({ show: false });

  const handleEdit = (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    SetId(id);
    setEdit(true);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => setAlert({ show: false }), 7000);
  };

  const handleDelete = (id) => {
    console.log(id);

    const newExpenses = expenses.filter((expense) => expense.id !== id);
    console.log(newExpenses);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
  };

  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    console.log(typeof e.target.value);
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });
      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          charge,
          amount,
        };
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }

      setCharge("");
      setAmount(0);
    } else {
      console.log("error");
      handleAlert({
        type: "danger",
        text: "charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.",
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <ExpenseForm
          edit={edit}
          handleSubmit={handleSubmit}
          handleAmount={handleAmount}
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
        />
      </div>
      <br />
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseList
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          initialExpenses={expenses}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <p style={{ fontSize: "1.5rem", textAlign: "right" }}>
          총 지출 :
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
