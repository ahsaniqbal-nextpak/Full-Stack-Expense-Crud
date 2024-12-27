export const getExpenses = async (onSuccess) => {
  try {
    const res = await fetch("http://localhost:8000/api/expenses");
    const data = await res.json();
    onSuccess(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = async (data, onSuccess) => {
  try {
    const res = await fetch("http://localhost:8000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const addedData = await res.json();
    onSuccess();
    return addedData;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaltion = async (id, onSuccess) => {
  try {
    const res = await fetch(`http://localhost:8000/api/expenses/${id}`, {
      method: "DELETE",
    });
    const deletedData = await res.json();
    onSuccess(deletedData);
    return deletedData;
  } catch (error) {
    console.log(error);
  }
};