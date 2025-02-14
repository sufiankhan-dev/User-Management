import UserForm from "../../../components/UserForm";

export default function AddUserPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mt-8 md:mt-0">
          Add New User
        </h2>
        <p className="text-muted-foreground">Create a new user account.</p>
      </div>

      <div className="max-w-2xl">
        <UserForm mode="add" />
      </div>
    </div>
  );
}
