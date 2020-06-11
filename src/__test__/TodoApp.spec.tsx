import * as React from "react";
import { render, fireEvent, RenderResult, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoApp from "../TodoApp";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer"

afterEach(cleanup)

let documentBody: RenderResult;

describe("<TodoApp />", () => {
  beforeEach(() => {
    documentBody = render(<TodoApp />);
  });

  it("`Todo List` present in document", () => {
    expect(documentBody.getByText("Todo List")).toBeInTheDocument();
  });

  it("renders button correctly", () => {
    expect(documentBody.getByTestId("add_todo")).toBeInTheDocument();
    expect(documentBody.getByTestId("add_todo")).toHaveTextContent('Add');
  });

  it('renders without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(<TodoApp/>,div)
  })
  it("rendered component should match snapshot style 1", () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });

  it("rendered component should match snapshot style 2", () => {
    const  baseElement  = renderer.create(<TodoApp />).toJSON();
    expect(baseElement).toMatchSnapshot();
  });

  it("should display a blank text input", () => {
    expect(documentBody.getByTestId("todoform")).toHaveFormValues({
      todo_value: "",
    });
  });

  it("should allow entering a todo and adding it", () => {
    const val = documentBody.getByTestId("todo_value");
    
    fireEvent.change(val, { target: { value: "Test todo" } });

    const addTodoButton = documentBody.getByTestId("add_todo");

    fireEvent.click(addTodoButton);

    const toDoEntry = documentBody.getByTestId("0");

    expect(toDoEntry.innerHTML).toBe('Test todo')
  });

  it("should allow toggling a todo status", () => {
    const val = documentBody.getByTestId("todo_value");
    
    fireEvent.change(val, { target: { value: "Test todo" } });

    const addTodoButton = documentBody.getByTestId("add_todo");

    fireEvent.click(addTodoButton);

    const toDoEntry = documentBody.getByTestId("0");

    expect(toDoEntry.innerHTML).toBe('Test todo')

    fireEvent.click(toDoEntry);

    expect(toDoEntry.style.textDecoration).toBe('line-through')

    fireEvent.click(toDoEntry);

    expect(toDoEntry.style.textDecoration).toBe('')

  });

  it("should correctly update remaining todos", () => {
    const val = documentBody.getByTestId("todo_value");
    
    fireEvent.change(val, { target: { value: "Test todo" } });

    const addTodoButton = documentBody.getByTestId("add_todo");

    fireEvent.click(addTodoButton);

    const toDoRem = documentBody.getByTestId("rem");

    let toDoRemCount : number = parseInt(documentBody.getByTestId("rem").innerHTML.valueOf());

    const toDoEntry = documentBody.getByTestId("0");

    fireEvent.click(toDoEntry);

    toDoRemCount = toDoRemCount-1;

    expect(toDoRem.innerHTML).toBe(`${toDoRemCount}`)

    fireEvent.click(toDoEntry);

    toDoRemCount = toDoRemCount+1;

    expect(toDoRem.innerHTML).toBe(`${toDoRemCount}`)

  });
});
