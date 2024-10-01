import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// This hook fetches the conversation based on a given userId
const useGetConversation = (recID) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const updatedmessages = useSelector((state) => state.message.messages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/recive/${recID}`);
        setMessages(res.data); // Set the fetched messages
      } catch (err) {
        setError(err); // Set the error if fetch fails
      } finally {
        setLoading(false); // Indicate that loading is finished
      }
    };

    if (recID) {
      fetchMessages(); // Only fetch if there's a valid userId
    }
  }, [recID, updatedmessages]);

  return { messages, loading, error }; // Return messages, loading status, and error
};

export default useGetConversation;
