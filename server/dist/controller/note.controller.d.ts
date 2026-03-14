import type { Request, Response } from "express";
export declare class NoteController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getNoteByid(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateByID(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteByID(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=note.controller.d.ts.map