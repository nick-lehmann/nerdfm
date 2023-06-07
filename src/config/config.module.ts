import { DynamicModule, Module } from '@nestjs/common'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import * as fs from 'fs'
import { TypedConfigModule, dotenvLoader, fileLoader } from 'nest-typed-config'
import * as path from 'path'
import { Config } from './config'

interface ConfigModuleOptions {
  path?: string
  config?: ClassConstructor<any>
}

@Module({})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    const configPath = options.path || path.join(process.cwd(), 'config', 'config.local.yml')
    if (!fs.existsSync(configPath)) throw Error('Config does not exist')
    const ConfigSchema = options.config || Config

    const configModule = TypedConfigModule.forRoot({
      schema: ConfigSchema,
      validate: (rawConfig: any) => {
        const config = plainToClass(ConfigSchema, rawConfig)
        const schemaErrors = validateSync(config, {
          forbidUnknownValues: true,
          forbidNonWhitelisted: true,
        })

        if (schemaErrors.length) throw new Error(TypedConfigModule.getConfigErrorMessage(schemaErrors))
        return config
      },
      load: [
        dotenvLoader(),
        fileLoader({
          absolutePath: configPath,
          ignoreEnvironmentVariableSubstitution: false,
        }),
      ],
      isGlobal: true,
    })

    return {
      module: ConfigModule,
      imports: [configModule],
      exports: [configModule],
    }
  }
}
