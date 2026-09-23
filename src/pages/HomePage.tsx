import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@base-ui/react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Card className="mx-auto max-w-xl space-y-4">
      <CardHeader>ระบบลงทะเบียนเรียน CPE & ISNE</CardHeader>
      <CardContent>
        <Button
          className="bg-neutral-200 text-black hover:bg-neutral-300 rounded-md px-2 py-2"
          render={<Link to={"./enrollment"} />}
        >
          ไปหน้าลงทะเบียนเรียน
        </Button>
      </CardContent>
    </Card>
  );
}
