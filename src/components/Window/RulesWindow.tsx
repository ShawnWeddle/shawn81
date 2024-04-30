const RulesWindow: React.FC = () => {
  return (
    <div className="flex flex-col">
      <p className="m-2 text-center text-2xl">
        Thank you for visiting{" "}
        <span className="text-site-blue">shawn81.com!</span>
      </p>
      <p className="mx-4 my-2">
        This website displays up to eighty-one (81) messages at a time.
      </p>
      <p className="mx-4 my-2">
        Click on a square to see the message it contains.
      </p>
      <p className="mx-4 my-2">
        Accounts can only post one message, so make it worth it.
      </p>
      <p className="mx-4 my-2">Please only make one account per person.</p>
      <p className="mx-4 my-2">
        I reserve the right to delete any messages I wish at any time.
      </p>
    </div>
  );
};

export default RulesWindow;
