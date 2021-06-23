// Get
export function list(req: any, res: any): any[] {
    return res.status(404).json({error: "data not found"});
};
