import { useNavigate } from "react-router-dom";
import { useAnecdotes, useField } from "../hooks";

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();
  const navigate = useNavigate();

  const { reset: contentReset, ...contentProps } = useField("text");
  const { reset: authorReset, ...authorProps } = useField("text");
  const { reset: infoReset, ...infoProps } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: contentProps.value,
      author: authorProps.value,
      info: infoProps.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
