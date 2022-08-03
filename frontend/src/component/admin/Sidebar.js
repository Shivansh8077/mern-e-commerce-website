import React from "react";
import "./sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
               <span>E commerce</span>
            </Link>
            <Link to="/dashboardAdmin">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>

            {/*<Link>*/}
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/productListAdmin">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/CreateProductAdmin">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            {/*</Link>*/}
            <Link to="/ordersAdmin">
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            <Link to="/usersAdmin">
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            <Link to="/reviewsAdmin">
                <p>
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;