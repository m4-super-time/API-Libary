import { Request, Response } from "express"
import { profileService } from "../../services/profile/profile.service"

const profileController = async (req: Request, res: Response) => {

    const userId: string = req.user.id
    const dataUser = await profileService(userId)
    return res.json(dataUser)

}

export default profileController