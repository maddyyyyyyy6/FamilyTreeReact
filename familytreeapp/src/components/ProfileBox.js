import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';
import Input from "@mui/joy/Input/Input";
const ProfileBox = ({ profile, setProfile }) => {

    const handleClose = () => {
        setProfile({ ...profile, showProfile: false })
    }
    return (
        <Dialog fullWidth={'xs'} scroll='body' open={true} onClose={() => console.log("hi")}>
            <DialogTitle>Member Details</DialogTitle>
            <DialogContent>
                <Avatar
                    alt={profile.data.name}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 107, height: 107, margin: "auto",fontSize:20 }}
                />
                <Typography variant="h4" component="h4">
                    {profile.data.name}
                </Typography>
                <Typography variant="h4" component="h4">
                    {profile.data.age}
                </Typography>
                <Typography variant="h4" component="h4">
                    {profile.data.gender}
                </Typography>
                {/* <Input value={"mahendra"} startDecorator={<PersonRoundedIcon />} placeholder="Name" sx={{ marginBottom: 1 }} /> */}


            </DialogContent>
            <DialogActions>
                < Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProfileBox;