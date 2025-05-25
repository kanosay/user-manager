import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { formatDistanceToNow } from "date-fns";

export default function Table({ handleCheckOne, handleSubmitAll, userData }) {

    return (
        <div className="container mt-5">
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                onChange={handleSubmitAll}
                                type="checkbox"
                            />
                        </th>
                        <th className="fs-6 fs-md-5">Name</th>
                        <th className="fs-6 fs-md-5">Email</th>
                        <th className="fs-6 fs-md-5">Last</th>
                        <th className="fs-6 fs-md-5">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.auth_id}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    checked={user.isChecked}
                                    onChange={() => handleCheckOne(user.auth_id)}
                                />
                            </td>
                            <td className="small">{user.name}</td>
                            <td className="small">{user.email}</td>
                            <td className="small">
                                {user.created_at
                                    ? formatDistanceToNow(new Date(user.created_at), {
                                        addSuffix: true,
                                    })
                                    : "Unknown"}
                            </td>
                            <td className="small">
                                {!user.isBlocked ? "Active" : 'Banned'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
