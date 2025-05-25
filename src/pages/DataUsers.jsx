import { useState, useEffect } from "react";
import Table from "../components/Table";
import supabase from "../supabase-clients";
import { useNavigate } from "react-router";

export default function DataUsers() {
    const [userData, setUserData] = useState([]);
    const [filterText, setFilterText] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('users').select('*');
            if (error) {
                console.error(error);
                return;
            }
            const dataWithCheck = data.map(user => ({ ...user, isChecked: false }));
            setUserData(dataWithCheck);
        }

        fetchData();
    }, []);

    function handleCheckOne(authId) {
        setUserData(prev =>
            prev.map(user =>
                user.auth_id === authId
                    ? { ...user, isChecked: !user.isChecked }
                    : user
            )
        );
    }

    function handleSubmitAll(e) {
        const checked = e.target.checked;
        setUserData(prev => prev.map(elem => ({ ...elem, isChecked: checked })));
    }

    async function handleDeleteSelected() {
        const usersToDelete = userData.filter(user => user.isChecked);
        const authIdsToDelete = usersToDelete.map(user => user.auth_id);

        const { error } = await supabase
            .from('users')
            .delete()
            .in('auth_id', authIdsToDelete);

        setUserData(prev => prev.filter(user => !authIdsToDelete.includes(user.auth_id)));
        const { data } = await supabase.from('users').select('*');
        if (data.some(elem => elem.auth_id === authIdsToDelete[0])) {
            await supabase.auth.signOut();
            navigate('/');
        }
    }

    async function handleBlockSelected() {
        const usersToBlock = userData.filter(user => user.isChecked);
        const authIdsToBlock = usersToBlock.map(user => user.auth_id);
        const { error } = await supabase
            .from('users')
            .update({ isBlocked: true })
            .in('auth_id', authIdsToBlock);

        setUserData(prev =>
            prev.map(user =>
                authIdsToBlock.includes(user.auth_id)
                    ? { ...user, isBlocked: true }
                    : user
            )
        );

        const { data } = await supabase.from('users').select('*');
        if (data.some(elem => elem.auth_id === authIdsToBlock[0])) {
            await supabase.auth.signOut();
            navigate('/');
        }
    }

    async function handleUnblockSelected() {
        const usersToUnblock = userData.filter(user => user.isChecked);
        const authIdsToUnblock = usersToUnblock.map(user => user.auth_id);

        const { error } = await supabase
            .from('users')
            .update({ isBlocked: false })
            .in('auth_id', authIdsToUnblock);

        setUserData(prev =>
            prev.map(user =>
                authIdsToUnblock.includes(user.auth_id)
                    ? { ...user, isBlocked: false }
                    : user
            )
        );
    }

    const filteredUsers = userData.filter(user =>
        user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <div className="container bg-light mt-5 p-4 rounded">
                <div className="btn-group btn-group-lg gap-2">
                    <button title="Block the user!" onClick={handleBlockSelected} type="button" className="btn border-primary bg-white rounded text-primary">
                        <i className="bi bi-lock-fill text-primary pe-2"></i>Block
                    </button>
                    <button title="Unblock the user!" onClick={handleUnblockSelected} type="button" className="btn border-primary bg-white rounded">
                        <i className="bi bi-unlock-fill text-primary"></i>
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        title="Delete the user!"
                        type="button"
                        className="btn border-danger bg-white rounded"
                    >
                        <i className="bi bi-trash-fill text-danger"></i>
                    </button>

                    <input
                        type="text"
                        name="filter"
                        id="filter"
                        placeholder="Filter..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="form-control ms-3"
                        style={{ maxWidth: "200px" }}
                    />
                </div>
            </div>

            <Table
                userData={filteredUsers}
                handleCheckOne={handleCheckOne}
                handleSubmitAll={handleSubmitAll}
            />
        </>
    );
}
