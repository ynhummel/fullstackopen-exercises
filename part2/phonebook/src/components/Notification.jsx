const Notification = ({ message, error }) => {
  const color = error ? "red" : "green";

  const notificationStyle = {
    color,
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 3,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  };

  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
