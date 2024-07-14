import { fetchVisitsThunk } from "@/app/features/company/thunk";
import { useAppDispatch } from "@/app/hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const VisitsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visitorId } = useParams<{ visitorId: string }>();

  useEffect(() => {
    if (!visitorId) return;

    dispatch(fetchVisitsThunk({ visitorId: visitorId! }));
  }, [visitorId]);

  return (
    <div>
      <h1>Visists Page</h1>
    </div>
  );
};

export default VisitsPage;
