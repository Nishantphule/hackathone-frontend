import { Card, CardContent } from "@mui/material";

export function CardBuilder({ content, id }) {
  return (
    <Card className="card" key={id}>
      <CardContent>
        <div className="head">
          <h2 className="title">Name :- {content.firstName}</h2>
          <h2>Sports :- {content.sports}</h2>
          <h5>Contact :- {content.phoneNumber}</h5>
          <small>Email :- {content.emailId}</small>
        </div>
      </CardContent>
    </Card>
  );
}
