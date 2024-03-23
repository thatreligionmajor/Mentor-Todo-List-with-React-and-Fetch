import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	//the useEffect will happen when the component mounts, or the page loads up
	useEffect(() => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch")
		.then(response => response.json())
		.then(data => {
		  console.log("The useEffect is loading some data: ", data) // always do this, because you won't always know what is there
		  setTodos(data)
		})
		.catch(
		  error => console.error("There was an error loading the useEffect: ", error)
		)
	}, [])

	//function to add a new todo to the list
	function addTodo(newTodo) {
		let newTodoList = [...todos, {label: newTodo, done: false}]
		
		fetch('https://playground.4geeks.com/apis/fake/todos/user/theresearch', {
		  method: "PUT",
		  body: JSON.stringify(newTodoList),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
			console.log(resp.ok); // Will be true if the response is successful
			console.log(resp.status); // The status code=200 or code=400 etc.
			return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
		})
		.then(response => {
			// Here is where your code should start after the fetch finishes
			console.log("Successfully added todo: ", response); // This will print on the console the exact object received from the server
			setTodos(newTodoList); //Update the setate with the new todo list
			setInputValue(""); // Clear the input value
		})
		.catch(error => {
			// Error handling
			console.log("There was an error adding the todo: ", error);
		});
	}

	function deleteTodo(index) {
		const newTodoList = todos.filter((todo, currentIndex) => index !== currentIndex)

		fetch('https://playground.4geeks.com/apis/fake/todos/user/theresearch', {
		  method: "PUT",
		  body: JSON.stringify(newTodoList),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
			console.log(resp.ok); // Will be true if the response is successful
			console.log(resp.status); // The status code=200 or code=400 etc.
			return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
		})
		.then(response => {
			// Here is where your code should start after the fetch finishes
			console.log("Successfully deleted todo: ", response); // This will print on the console the exact object received from the server
			setTodos(newTodoList); // Update the state with the new todo list
		})
		.catch(error => {
			// Error handling
			console.log("There was an error deleting the todo: ", error);
		});
	}

	return (
		<div className="container">
			<h1>
				<em>
					<strong>My Todo List:</strong>
				</em>
			</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								addTodo(inputValue)
								setInputValue("")
							}
						}}
						placeholder="create a new task"
					/>
				</li>
				{todos.map((t, index) => (
					<li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
						{t.label}
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" onClick={() => deleteTodo(index)}>
							<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
						</svg>
					</li>
				))}
				<div>
					<strong>
						<em>{todos.length} tasks</em>
					</strong>
				</div>
			</ul>
		</div>
	);
};

export default Home;
