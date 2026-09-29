import RequestCard from "./RequestCard.jsx";

function RequestList({ requests, myBooksById, onStatusChange }) {
  return (
    <div className="mt-6 space-y-3">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          myBook={myBooksById.get(request.myBookId)}
          offeredBook={myBooksById.get(request.offeredBookId)}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default RequestList;
