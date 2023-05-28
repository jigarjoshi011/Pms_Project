import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DashboardService } from '../services/dashboard.service';
import { Response, Request, query } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { addRoleByAdmin, checkDelete, checkUserAdded, updateDto } from '../dto/getDashboardDTO';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService, private jwtService: JwtService,) {}
  @Get('')
  @Render('dashboard')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard Render.' })
  @ApiOperation({ summary: 'Dashboard' })
  async getDashboard(@Req() req: Request, @Res() res: Response): Promise<any> {
    const result: any = await this.dashboardService.getDashboards();
  }

  @Get('listUsers')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'UserData-page' })
  @Render('listUsers')
  root() {
    return;
  }
  @Get('user')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Edit-page' })
  @Render('edit_user')
  getEditPage() {
    return;
  }
  @Get('createUser')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Edit-page' })
  @Render('create_user')
  getCreateIserPage() {
    return;
  }
  @Get('createRole')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Edit-page' })
  @Render('create_role')
  getCreateRolePage() {
    return;
  }
  @Get('listRole')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Edit-page' })
  @Render('Roles')
  getListRolePage() {
    return;
  }
  @Post('createRole')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Edit-page' })
  async getCreateRole( @Req() req: Request,
  @Res() res: Response, @Body() data:addRoleByAdmin) {
    const result: any = await this.dashboardService.addRolePermissions(data);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Role Added Successfully`,
    });
  }
  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User-Data-Edit-page' })
  @ApiOperation({ summary: 'User-Data-Edit-page' })
  async getEditPageData(
    @Req() req: Request,
    @Res() res: Response,
    @Param() pramas,
  ) {
    const result: any = await this.dashboardService.getEditPageDataLoad(pramas);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Fetched`,
    });
  }
  @Get('user/role/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Data-Edit-page' })
  async getEditPageUserRole(
    @Req() req: Request,
    @Res() res: Response,
    @Param() pramas,
  ) {
    const result: any = await this.dashboardService.getEditPageRole(pramas);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Fetched`,
    });
  }
  @Post('user/addUser')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Data-Edit-page' })
  async addUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data:checkUserAdded,
  ) {
    console.log(data)
    const result: any = await this.dashboardService.addUserByAdmin(data);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Saved`,
    });
  }
  @Get('user/allrole/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Data-Edit-page' })
  async getEditPageUserAllRole(@Req() req: Request, @Res() res: Response) {
    
    const result: any = await this.dashboardService.getEditPageAllRole();
 
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Fetched`,
    });
  }
  @Post('user/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'User-Data-Edit-Store' })
  async PostEditedUserData(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: updateDto,
  ) {
    const result: any = await this.dashboardService.getUpdateDta(data);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Updated successfully`,
    });
  }

  @Get('UserRecords')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User Data' })
  @ApiOperation({ summary: 'User Data for admin' })
  async getUsers(@Req() req: Request, @Res() res: Response, @Query() parmas:string): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.dashboardService.getUserData(parmas,payload);
    
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Fetched`,
    });
  }
  @Get('UserRecords/length')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User Data' })
  @ApiOperation({ summary: 'User Data for admin' })
  async getUserslength(@Req() req: Request, @Res() res: Response, @Query() parmas:string): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.dashboardService.getUserDatalength(payload);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Fetched`,
    });
  }

  @Get('user/search/data')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User Data' })
  @ApiOperation({ summary: 'User Data for Search' })
  async getUserssearch(
    @Req() req: Request,
    @Res() res: Response,
    @Query() params: string,
  ): Promise<any> {
    
    const result: any = await this.dashboardService.getUserDataSearch(params);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Searched`,
    });
  }
  @Get('logout')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    res.clearCookie('auth_token');
    res.clearCookie('data');
    res.redirect('/login');
  }

  @Post('deleteRecord')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete User Data' })
  @ApiOperation({ summary: 'Delete User Data by admin' })
  async getUsersDelete(
    @Req() req: Request,
    @Res() res: Response,
    @Body() Dto: checkDelete,
  ): Promise<any> {
    const result: any = await this.dashboardService.DeleteUserAction(Dto);
    console.log(
      '🚀 ~ file: dashboard.controller.ts:67 ~ DashboardController ~ result:',
      result,
    );
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: null,
      message: `User Record deleted successfully`,
    });
  }
}
