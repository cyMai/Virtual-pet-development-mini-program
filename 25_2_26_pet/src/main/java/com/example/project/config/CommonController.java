package com.example.project.config;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Random;

/**
 * 通用请求处理
 *
 * @author system
 */
@RestController
public class CommonController
{

    /**
     * 通用上传请求
     */
    @PostMapping("/common/upload")
    public AjaxResult uploadFile(MultipartFile file) throws Exception
    {
        try
        {
            long timestamp = System.currentTimeMillis();

            String fileName1 = file.getOriginalFilename();
            assert fileName1 != null;
            Random random = new Random();
            int randomNumber = 10 + random.nextInt(90); // 生成10到99之间的随机数
            String fileName =timestamp+randomNumber+"."+fileName1.substring(fileName1.lastIndexOf(".")+1);
            // 上传文件路径
            String uploadDir = System.getProperty("user.dir") + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "uploadImage";
            String targetDir = System.getProperty("user.dir") + File.separator + "target" + File.separator + "classes" + File.separator + "static" + File.separator + "uploadImage";

            // 创建目录（如果不存在）
            File uploadPath = new File(uploadDir);
            File targetPath = new File(targetDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }
            if (!targetPath.exists()) {
                targetPath.mkdirs();
            }

            // 文件保存到初始目录
            File uploadFile = new File(uploadPath, fileName);
            file.transferTo(uploadFile);

            // 复制到 target 目录
            File targetFile = new File(targetPath, fileName);
            Files.copy(uploadFile.toPath(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);


            System.out.println(uploadDir);
            String url = "http://localhost:9999/uploadImage/" + fileName;
            AjaxResult ajax = AjaxResult.success();
            ajax.put("fileName", fileName);
            ajax.put("url", url);
            return ajax;
        }
        catch (Exception e)
        {
            return AjaxResult.error(e.getMessage());
        }
    }




}
